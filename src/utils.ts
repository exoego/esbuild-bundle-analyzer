import fs from "node:fs";

import type { Metafile } from "esbuild";
import type { Report } from "./types";

function loadJsonFile(path: string) {
	return JSON.parse(fs.readFileSync(path).toString("utf-8"));
}

export function loadMetaFile(path: string): Metafile {
	return loadJsonFile(path) as Metafile;
}

export function loadAnalysisJson(path: string): Report {
	return loadJsonFile(path) as Report;
}

// https://github.com/actions/toolkit/blob/81a73aba8bedd532f6eddcc41ed3a0fad8b1cfeb/packages/core/src/core.ts#L126
export function getInput(name: string): string {
	const val = process.env[`INPUT_${name.toUpperCase()}`] || "";
	return val.trim();
}
