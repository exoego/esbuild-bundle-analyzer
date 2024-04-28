import fs from "node:fs";
import path from "node:path";
import { filesize as originalFilesize } from "filesize";
import type { CompareResult, Options, Report } from "./types";
import { loadAnalysisJson } from "./utils";

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
		output += markdownTable(comparison, input.budgetPercentIncreaseRed);

		if (input.showDetails) {
			output += `\n<details>
<summary>Details</summary>
<p>Next to the size is how much the size has increased or decreased compared with the base branch of this PR.</p>
<ul>
<li>‼️: Size increased by ${input.budgetPercentIncreaseRed}% or more. Special attention should be given to this.</li>
<li>⚠️: Size increased in acceptable range (lower than ${input.budgetPercentIncreaseRed}%).</li>
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

	// if ignoreIfEmpty is true, set output to an empty string
	if (!hasAnyChange && input.skipCommentIfEmpty) {
		output = "";
	}

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
