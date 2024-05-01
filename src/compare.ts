import fs from "node:fs";
import path from "node:path";
import type { TreemapSeriesOption } from "echarts";
import { TreemapChart } from "echarts/charts";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";

import process from "node:process";
import { filesize as originalFilesize } from "filesize";
import type { CompareResult, Options, Report } from "./types";
import { loadAnalysisJson, loadMetaFile } from "./utils";

echarts.use([TreemapChart, SVGRenderer]);

interface TreeMapNode {
	value: number;
	name: string;
	color?: Array<string>;
	path: string;
	children: TreeMapNode[];
}

function buildTree(input: Record<string, { bytesInOutput: number }>) {
	const root: TreeMapNode = { name: "", path: "", value: 0, children: [] };
	for (const [filePath, { bytesInOutput }] of Object.entries(input)) {
		const directories = filePath.split("/");
		buildNode(root, directories, bytesInOutput);
	}
	colorize(root);

	return root.children;
}

function buildNode(
	node: TreeMapNode,
	directories: Array<string>,
	value: number,
): void {
	const dir = directories.shift();
	if (dir === undefined) {
		return;
	}
	let child = node.children.find((child) => child.name === dir);
	if (!child) {
		child = {
			name: dir,
			path: `${node.path}/${dir}`.replace(/^\//, ""),
			value: value,
			children: [],
		};
		node.children.push(child);
	}
	node.value += value;
	buildNode(child, directories, value);
}

// https://spectrum.adobe.com/page/color-for-data-visualization/#Categorical
const COLOR_PALETTE = [
	"rgb( 83, 178, 173)",
	"rgb( 65,  70, 195)",
	"rgb(231, 139,  55)",
	"rgb(205,  74, 129)",
	"rgb(127, 132, 242)",
	"rgb(142, 221, 120)",
	"rgb( 57, 120, 235)",
	"rgb(106,  43, 203)",
	"rgb(226, 199,  66)",
];

function colorize(root: TreeMapNode): void {
	root.children.forEach((child, index) => {
		if (index % 2 === 0) {
			child.color = [...COLOR_PALETTE];
		} else {
			child.color = [...COLOR_PALETTE].reverse();
		}
	});
}

export function compare(input: Options): void {
	let hasAnyChange = false;
	let output = `## 📦 esbuild Bundle Analysis for ${input.name}

This analysis was generated by [esbuild-bundle-analyzer](https://github.com/exoego/esbuild-bundle-analyzer). 🤖
`;

	const current = loadAnalysisJson(
		path.join(process.cwd(), input.analyzerDirectory, "bundle_analysis.json"),
	);
	let base: Report;
	try {
		base = loadAnalysisJson(
			path.join(
				process.cwd(),
				input.analyzerDirectory,
				"base/bundle/bundle_analysis.json",
			),
		);
	} catch (e) {
		base = {};
	}

	const baseLength = 80;
	const myChart = echarts.init(null, null, {
		ssr: true,
		renderer: "svg",
		width: 23 * baseLength,
		height: 9 * baseLength,
	});
	for (const metafileRelPath of input.metafiles) {
		const metafile = loadMetaFile(path.join(process.cwd(), metafileRelPath));
		for (const [outfile, buildMeta] of Object.entries(metafile.outputs)) {
			const data = buildTree(buildMeta.inputs);
			myChart.clear();
			const option: TreemapSeriesOption = {
				type: "treemap",
				visibleMin: 300,
				breadcrumb: {
					show: false,
				},
				// Disable mouse events: https://echarts.apache.org/en/option.html#series-treemap.silent
				silent: true,
				label: {
					show: true,
				},
				upperLabel: {
					show: true,
					height: 20,
					formatter: (params) => {
						if (typeof params.value !== "number") {
							return `{directory| ${params.name}/}`;
						}
						const kb = (params.value / 1024).toFixed(0);
						return `{directory| ${params.name}/} {dirsize| ${kb} KB}`;
					},
					rich: {
						directory: {
							color: "#fff",
						},
						dirsize: {
							color: "rgba(255,255,255,0.6)",
						},
					},
					backgroundColor: "transparent",
					position: "insideTop",
					align: "center",
					distance: 15,
				},
				itemStyle: {
					borderColorSaturation: 0.4,
					borderWidth: 2,
					gapWidth: 1,
				},
				levels: [
					{
						color: ["#222"],
						itemStyle: {},
						upperLabel: {
							// No parent label for top-level nodes like `node_modules/`
							show: false,
						},
					},
					{
						itemStyle: {
							borderWidth: 1,
							gapWidth: 3,
						},
					},
				],
				data,
			};
			myChart.setOption({ series: [option] });

			fs.writeFileSync(
				path.join(
					process.cwd(),
					input.analyzerDirectory,
					`${metafileRelPath}/${outfile}.svg`.replaceAll(/[/>]/g, "_"),
				),
				myChart.renderToSVGString().trim(),
			);
			fs.writeFileSync(
				path.join(
					process.cwd(),
					input.analyzerDirectory,
					`${metafileRelPath}/${outfile}.json`.replaceAll(/[/>]/g, "_"),
				),
				JSON.stringify(data, null, 2),
			);
		}
	}
	myChart.dispose();

	const allOutFiles: string[] = [
		...new Set([...Object.keys(current), ...Object.keys(base)]),
	].sort();
	const comparison: Array<CompareResult> = allOutFiles.map((outfile) => {
		const currentStats = current[outfile];
		const baseStats = base[outfile];

		if (!currentStats) {
			hasAnyChange = true;
			// deleted out file
			return { ...baseStats, diff: -1, remark: "deleted" };
		}
		if (!baseStats) {
			hasAnyChange = true;
			// new out file
			return { ...currentStats, diff: -1, remark: "added" };
		}
		const diff = currentStats.bytes - baseStats.bytes;
		const increase = !!Math.sign(diff);
		if (diff !== 0) {
			hasAnyChange = true;
		}
		return {
			...currentStats,
			diff,
			remark: increase ? "increased" : "decreased",
		};
	});

	if (hasAnyChange) {
		output += markdownTable(comparison, input.percentExtraAttention);

		if (input.showDetails) {
			output += `\n<details>
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
	} else {
		output += "This PR introduced no changes to the esbuild bundle! 🙌";
	}

	// we add this tag so that our action can be able to easily and
	// consistently find the right comment to edit as more commits are pushed.
	output += `<!-- __ESBUILD_BUNDLE_${input.name} -->`;

	// Log mostly for testing and debugging.
	// This will show up in the github actions console.
	console.dir({
		input,
		hasAnyChange,
		output,
	});

	// Write the output to a file which is later read in
	// as comment contents by the actions workflow.
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

function filesize(bytes: number): string {
	return originalFilesize(bytes, {
		spacer: " ",
	});
}

function markdownTable(
	data: Array<CompareResult>,
	redThreshold: number,
): string {
	const rows = data
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
	if (d.diff) {
		const percentChange = (d.diff / d.bytes) * 100;
		return `${renderStatusIndicator(percentChange, redThreshold)}${filesize(
			d.diff,
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
