import * as console from "node:console";
import fs from "node:fs";
import path from "node:path";
import {findMetafiles} from "./report";
import type {CompareResult, Input, Report, TreeMapNode} from "./types";
import {loadAnalysisJson, loadMetaFile} from "./utils";

export function compare(input: Input): void {
    let hasAnyChange = false;
    let output = `## 📦 esbuild Bundle Analysis for ${input.name}

This analysis was generated by [esbuild-bundle-analyzer](https://github.com/exoego/esbuild-bundle-analyzer). 🤖
`;

    const currentAnalysisPath = path.join(
        process.cwd(),
        input.analyzerDirectory,
        "bundle_analysis.json",
    );
    const current = loadAnalysisJson(currentAnalysisPath);
    console.log(`Current analysis found in ${currentAnalysisPath}`, current);
    const base = loadBaseAnalysisJson(input);

    const fileTree = buildFileTree(input);

    const allOutFiles: string[] = [
        ...new Set([...Object.keys(current), ...Object.keys(base)]),
    ].sort();

    const comparison: Array<CompareResult> = allOutFiles.map((outfile) => {
        const currentStats = current[outfile];
        const baseStats = base[outfile];
        console.log("Comparing", outfile, currentStats, baseStats);

        if (!currentStats) {
            console.log("Deleted file", outfile);
            hasAnyChange = true;
            return {
                ...baseStats,
                baseBytes: -1,
                remark: "deleted",
                tree: undefined,
            };
        }

        const tree = fileTree.get(
            treeKey(currentStats.metafile, currentStats.outfile),
        );
        if (!baseStats) {
            console.log("New file", outfile);
            hasAnyChange = true;
            return {...currentStats, baseBytes: -1, remark: "added", tree};
        }

        const diff = currentStats.bytes - baseStats.bytes;
        if (diff !== 0) {
            console.log("Changed file", outfile, diff);
            hasAnyChange = true;
        } else {
            console.log("No change", outfile);
        }
        return {
            ...currentStats,
            baseBytes: baseStats.bytes,
            tree,
            remark: Math.sign(diff) ? "increased" : "decreased",
        };
    });
    console.log("Comparison done.", comparison);

    if (hasAnyChange) {
        output += markdownTable(
            comparison,
            input.percentExtraAttention,
            input.showNoChange,
        );
        output += noChangesTable(comparison, input.showNoChange);
        output += fileSizeTable(comparison, input.topNLargestPaths);
        output += detail(input);
    } else {
        output += "This PR introduced no changes to the esbuild bundle! 🙌";
    }

    // we add this tag so that our action can be able to easily and
    // consistently find the right comment to edit as more commits are pushed.
    output = `<!-- __ESBUILD_BUNDLE_${input.name} -->
` + output;

    writeComment(input, output);
}

function treeKey(metafile: string, outfile: string): string {
    return `${metafile} -> ${outfile}`;
}

// Write the output to a file which is later read in
// as comment contents by the actions workflow.
function writeComment(input: Input, output: string): void {
    console.log("Writing comment to file.", output);
    fs.mkdirSync(path.join(process.cwd(), input.analyzerDirectory), {
        recursive: true,
    });
    fs.writeFileSync(
        path.join(
            process.cwd(),
            input.analyzerDirectory,
            "bundle_analysis_comment.txt",
        ),
        output.trim(),
    );
}

function detail(input: Input): string {
    if (!input.showDetails) {
        return "";
    }
    return `\n<details>
<summary>Details</summary>
<p>Next to the size is how much the size has increased or decreased compared with the base branch of this PR.</p>
<ul>
<li>‼️: Size increased by ${input.percentExtraAttention}% or more. Special attention should be given to this.</li>
<li>⚠️: Size increased in acceptable range (lower than ${input.percentExtraAttention}%).</li>
<li>✅: No change or even downsized.</li>
<li>🗑️: The out file is deleted: not found in base branch.</li>
<li>🆕: The out file is newly found: will be added to base branch.</li>
</ul>
</details>\n`;
}

function loadBaseAnalysisJson(input: Input): Report {
    try {
        const baseAnalysisPath = path.join(
            process.cwd(),
            input.analyzerDirectory,
            "base/bundle/bundle_analysis.json",
        );
        const report = loadAnalysisJson(baseAnalysisPath);
        console.info(`Base analysis found in ${baseAnalysisPath}`, report);
        return report;
    } catch (e) {
        console.warn(
            "No base analysis found. First setup or all artifacts are expired.",
        );
        return {};
    }
}

function buildFileTree(input: Input) {
    function buildRoot(
        input: Record<string, { bytesInOutput: number }>,
    ): TreeMapNode {
        const root: TreeMapNode = {name: "", path: "", value: 0, children: []};
        for (const [filePath, {bytesInOutput}] of Object.entries(input)) {
            const directories = filePath.split("/");
            buildNode(root, directories, bytesInOutput);
        }
        return root;
    }

    function buildNode(
        node: TreeMapNode,
        paths: Array<string>,
        value: number,
    ): void {
        const first = paths.shift();
        if (first === undefined) {
            // leaf node (file)
            node.value += value;
            return;
        }
        let child = node.children.find((child) => child.name === first);
        if (!child) {
            child = {
                name: first,
                path: `${node.path}/${first}`.replace(/^\//, ""),
                value: 0,
                children: [],
            };
            node.children.push(child);
        }
        node.value += value;
        buildNode(child, paths, value);
    }

    const trees = new Map<string, TreeMapNode>();
    if (input.topNLargestPaths <= 0) {
        // Skip building tree if we don't need it.
        return trees;
    }
    for (const {relativePath, absolutePath} of findMetafiles(input)) {
        const metafileJson = loadMetaFile(absolutePath);
        for (const [outfile, buildMeta] of Object.entries(metafileJson.outputs)) {
            const tree = buildRoot(buildMeta.inputs);
            trees.set(treeKey(relativePath, outfile), tree);

            fs.writeFileSync(
                path.join(process.cwd(), input.analyzerDirectory, "tree.json"),
                JSON.stringify(tree, null, 2),
            );
        }
    }
    return trees;
}

const spacer = " ";

function filesize(bytes: number): string {
    const sign = bytes < 0 ? "-" : "";
    const n = Math.abs(bytes);
    if (n < 1000) {
        return `${sign}${n}${spacer}B`;
    }
    if (n < 1000 * 1000) {
        return `${sign}${(n / 1000).toFixed(2)}${spacer}KB`;
    }
    if (n < 1000 * 1000 * 1000) {
        return `${sign}${(n / 1000 / 1000).toFixed(2)}${spacer}MB`;
    }
    if (n < 1000 * 1000 * 1000 * 1000) {
        return `${sign}${(n / 1000 / 1000 / 1000).toFixed(2)}${spacer}GB`;
    }
    throw new Error("Too large file size!! Are you sure?");
}

const shouldShowBundle = (d: CompareResult, showNoChange: boolean) =>
    showNoChange || d.bytes - d.baseBytes !== 0;

function markdownTable(
    data: Array<CompareResult>,
    redThreshold: number,
    showNoChange: boolean,
): string {
    const rows = data
        .filter((d) => shouldShowBundle(d, showNoChange))
        .map((d) => {
            return `${d.metafile} | ${d.outfile} | ${renderSize(d)} | ${renderNote(
                d,
                redThreshold,
            )}\n`;
        })
        .join("");

    return `
Meta File | Out File  | Size (raw) | Note
----------|----------|-----------:|------
${rows}`;
}

function noChangesTable(
    data: Array<CompareResult>,
    showNoChange: boolean,
): string {
    const noChangeBundles = data.filter(
        (d) => !shouldShowBundle(d, showNoChange),
    );
    const rows = noChangeBundles
        .map((d) => {
            return `${d.metafile} | ${d.outfile} | ${renderSize(d)} | ✅  No change\n`;
        })
        .join("");
    if (noChangeBundles.length === 0) {
        return "";
    }
    return `
<details>
<summary>${noChangeBundles.length} bundles with no change are hidden.</summary>    

Meta File | Out File  | Size (raw) | Note 
----------|----------|-----------:|------
${rows}

</details>
`;
}

/**
 * Find the top N largest nodes in root tree.
 * Dig nodes until the depth of 3.
 */
function findLargeDirectories(root: TreeMapNode, N: number) {
    const nodes: TreeMapNode[] = [];
    const queue: Array<{ node: TreeMapNode; depth: number }> = [
        {node: root, depth: 0},
    ];
    while (queue.length > 0) {
        const shift = queue.shift();
        if (!shift) {
            break;
        }
        const {node, depth} = shift;
        if (depth === 3) {
            nodes.push(node);
            continue;
        }
        if (node.children.length === 0) {
            nodes.push(node);
        } else {
            for (const item of node.children) {
                queue.push({node: item, depth: depth + 1});
            }
        }
    }
    const largeNodes = nodes.sort((a, b) => b.value - a.value).slice(0, N);
    return {
        largeNodes,
        hasOther: nodes.length > N,
    };
}

function fixedPercent(n: number, d: number): number {
    return Number.parseFloat(((n / d) * 100).toFixed(1));
}

function fileSizeTable(
    data: Array<CompareResult>,
    topNLargestPaths: number,
): string {
    if (data.length === 0 || topNLargestPaths <= 0) {
        return "";
    }
    let output = "";
    output += "<details>\n";
    output += "<summary>Largest paths</summary>\n";
    output += `These visualization shows top ${topNLargestPaths} largest paths in the bundle.\n`;
    for (const d of data) {
        output += "\n";
        output += `## Meta file: ${d.metafile}, Out file: ${d.outfile}\n`;
        if (!d.tree) {
            output += "️️🗑️Deleted\n";
            continue;
        }
        output += "| Path | Size |\n";
        output += "|------|-------|\n";
        const totalSize = d.tree.value;
        const {largeNodes, hasOther} = findLargeDirectories(
            d.tree,
            topNLargestPaths,
        );
        for (const {path, value} of largeNodes) {
            const percent = fixedPercent(value, totalSize);
            output += `| ${path} | ${renderBar(percent, value)} |\n`;
        }
        if (hasOther) {
            const otherSize = totalSize - largeNodes[0].value;
            const otherPercent = fixedPercent(otherSize, totalSize);
            output += `| (other) | ${renderBar(otherPercent, otherSize)} |\n`;
        }
    }
    output += "</details>\n";
    return output;
}

function renderBar(percent: number, bytes: number): string {
    const bar = progress(percent / 100);
    return `\${{\\color{Goldenrod}{ ${bar} }}}\$ ${percent.toFixed(
        1,
    )}%, ${filesize(bytes)}`;
}

// Block progression is 1/8 = 0.125
const blocks = ["", "▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];
const progression = 1 / (blocks.length - 1);

function progress(value: number, length = 25, vmin = 0.0, vmax = 1.0) {
    const v = value * length;
    const integerPart = Math.floor(v);
    const fractionalPart = v - integerPart;
    const i = Math.round(
        (progression * Math.floor(fractionalPart / progression)) / progression,
    );
    return "█".repeat(integerPart) + blocks[i];
}

function renderSize(d: CompareResult): string {
    return filesize(d.bytes);
}

function renderNote(d: CompareResult, redThreshold: number): string {
    if (d.remark === "deleted") {
        return "🗑️ Deleted";
    }
    if (d.remark === "added") {
        return "🆕 Added";
    }
    const diff = d.bytes - d.baseBytes;
    if (diff !== 0) {
        const percentChange = (diff / d.baseBytes) * 100;
        return `${renderStatusIndicator(percentChange, redThreshold)}${filesize(
            diff,
        )} (${sign(percentChange)}${percentChange.toFixed(1)}%)`;
    }
    return "✅  No change";
}

function sign(num: number): string {
    return num < 0 ? "" : "+";
}

function renderStatusIndicator(
    percentChange: number,
    redThreshold: number,
): string {
    let res: string;
    if (percentChange > 0 && percentChange < redThreshold) {
        res = "⚠️";
    } else if (percentChange >= redThreshold) {
        res = "‼️";
    } else {
        res = "✅ ";
    }
    return `${res} ${sign(percentChange)}`;
}
