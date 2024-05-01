import { pathToFileURL } from "node:url";
import { compare } from "./compare";
import { report } from "./report";
import type { Options } from "./types";
import { getInput } from "./utils";

function getOptions(): Options {
	const rawMetafiles = getInput("metafiles");
	if (!rawMetafiles) {
		throw new Error("metafiles is not specified");
	}
	const name = getInput("name");
	if (!name) {
		throw new Error("name is not specified");
	}
	return {
		budgetPercentIncreaseRed: Number.parseInt(
			getInput("percent_extra_attention") || "20",
			10,
		),
		showDetails: ["true", "True", "TRUE"].includes(
			getInput("show_details") || "true",
		),
		includeExtensions: (
			getInput("include_extensions") || ".js,.mjs,.cjs"
		).split(","),
		name,
		analyzerDirectory: getInput("analyze_directory") || ".analyzer",
		metafiles: rawMetafiles.split(","),
	};
}

export function run(options: Options = getOptions()): void {
	report(options);
	compare(options);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	run();
}
