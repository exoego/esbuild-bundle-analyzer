import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import type { Options, Report } from "./types";
import { loadMetaFile } from "./utils";

export function report(input: Options): void {
	const allPageSizes = getAllPageSizes(input);
	fs.mkdirSync(path.join(process.cwd(), input.analyzerDirectory), {
		recursive: true,
	});
	const resultJsonPath = path.join(
		process.cwd(),
		input.analyzerDirectory,
		"bundle_analysis.json",
	);
	fs.writeFileSync(resultJsonPath, JSON.stringify(allPageSizes, null, 2));
	console.log(`Wrote ${resultJsonPath}`);
}

function getAllPageSizes(input: Options): Report {
	const acc: Report = {};
	return input.metafiles.reduce((acc, metafile) => {
		const metaFilePath = path.join(process.cwd(), metafile);
		try {
			fs.accessSync(metaFilePath, fs.constants.R_OK);
		} catch (err) {
			console.error(
				`No meta file found at "${metaFilePath}" - a path to meta file may be wrong, or esbuild is not executed.`,
			);
			process.exit(1);
		}

		const metaFileJson = loadMetaFile(metaFilePath);
		Object.entries(metaFileJson.outputs).reduce((acc, output) => {
			const [outfile, buildMeta] = output;
			if (
				!input.includeExtensions.some((ext) =>
					outfile.toLowerCase().endsWith(ext),
				)
			) {
				return acc;
			}
			acc[`${metafile} -> ${outfile}`] = {
				bytes: buildMeta.bytes,
				metafile,
				outfile,
			};
			return acc;
		}, acc);
		return acc;
	}, acc);
}
