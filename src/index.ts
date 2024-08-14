import { pathToFileURL } from "node:url";
import { compare } from "./compare";
import { report } from "./report";
import type { Input } from "./types";
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
	return {
		percentExtraAttention: getNumberInput("percent_extra_attention", 20),
		showDetails: getBooleanInput("show_details", "true"),
		showNoChange: getBooleanInput("show_no_change", "true"),
		showTotalChanges: getBooleanInput("show_total_changes", "false"),
		topNLargestPaths: getNumberInput("top_n_largest_paths", 20),
		includeExtensions: (
			getSingleInput("include_extensions") || ".js,.mjs,.cjs"
		).split(","),
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
