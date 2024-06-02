import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import * as console from "node:console";
import { globSync } from "glob";
import type { Input, Report } from "./types";
import { loadMetaFile } from "./utils";

export function report(input: Input): void {
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
	console.log(`Wrote ${resultJsonPath}`, allPageSizes);
}

interface MetafilePath {
	readonly relativePath: string;
	readonly absolutePath: string;
}

export function findMetafiles(input: Input): MetafilePath[] {
	return input.metafiles.flatMap((metafile) => {
		return globSync(path.join(process.cwd(), metafile), {
			nodir: true,
		}).map((metaFilePath) => {
			return {
				relativePath: path.relative(process.cwd(), metaFilePath),
				absolutePath: metaFilePath,
			};
		});
	});
}

function getAllPageSizes(input: Input): Report {
	const acc: Report = {};
	return findMetafiles(input).reduce((acc, { relativePath, absolutePath }) => {
		try {
			fs.accessSync(absolutePath, fs.constants.R_OK);
		} catch (err) {
			console.error(
				`No meta file found at "${absolutePath}" - a path to meta file may be wrong, or esbuild is not executed.`,
			);
			process.exit(1);
		}

		const metaFileJson = loadMetaFile(absolutePath);
		Object.entries(metaFileJson.outputs).reduce((acc, output) => {
			const [outfile, buildMeta] = output;
			if (
				!input.includeExtensions.some((ext) =>
					outfile.toLowerCase().endsWith(ext),
				)
			) {
				return acc;
			}
			acc[`${relativePath} -> ${outfile}`] = {
				bytes: buildMeta.bytes,
				metafile: relativePath,
				outfile,
			};
			return acc;
		}, acc);
		return acc;
	}, acc);
}
