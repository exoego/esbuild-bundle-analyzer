import console from "node:console";
import { pathToFileURL } from "node:url";
import { compare } from "./compare";
import { report } from "./report";
import type { Input, SizeComparisonFilter } from "./types";
import { getBooleanInput, getNumberInput, getSingleInput } from "./utils";

function getInput(): Input {
	const rawMetafiles = getSingleInput("metafiles");
	if (!rawMetafiles) {
		throw new Error("metafiles is not specified");
	}
	const name = getSingleInput("name");
	if (!name) {
		throw new Error("name is not specified");
	}
	const filters = new Set<SizeComparisonFilter>(
		(
			getSingleInput("include_size_comparison") ||
			"added, deleted, increased, decreased, no-change"
		)
			.split(",")
			.map((s) => {
				switch (s.trim()) {
					case "added":
					case "deleted":
					case "increased":
					case "decreased":
					case "total":
					case "no-change":
						return s.trim() as SizeComparisonFilter;
					default:
						throw new Error(`Unknown size comparison filter: ${s}`);
				}
			}),
	);
	const rawShowNoChange = getSingleInput("show_no_change");
	if (rawShowNoChange !== "") {
		if (getBooleanInput("show_no_change", "true")) {
			filters.add("no-change");
			console.log(
				"`show_no_change: true` is deprecated. Instead, remove `no-change` from the `include_size_comparison` list.",
			);
		} else {
			filters.delete("no-change");
			console.log(
				"`show_no_change: false` is deprecated. Instead, add `no-change` to the `include_size_comparison` list.",
			);
		}
	}
	return {
		percentExtraAttention: getNumberInput("percent_extra_attention", 20),
		showDetails: getBooleanInput("show_details", "true"),
		topNLargestPaths: getNumberInput("top_n_largest_paths", 20),
		includeExtensions: (
			getSingleInput("include_extensions") || ".js,.mjs,.cjs"
		).split(","),
		includeSizeComparison: filters,
		name,
		analyzerDirectory: getSingleInput("analyze_directory") || ".analyzer",
		metafiles: rawMetafiles.split(","),
	};
}

export function run(input: Input = getInput()): void {
	report(input);
	compare(input);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	run();
}
