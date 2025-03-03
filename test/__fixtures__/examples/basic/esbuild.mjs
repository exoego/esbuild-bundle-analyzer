import {mkdirSync, writeFileSync} from "node:fs";
import { build } from "esbuild";

const result = await build({
	entryPoints: [`./src/index.ts`],
	outfile: `out/index.mjs`,
	format: "esm",
	metafile: true,
	mainFields: ["module", "main"],
	platform: "node",
	target: "node20.9",
	bundle: true,
	plugins: [],
	loader: {
		".node": "copy",
	},
	assetNames: "resources/[name]-[hash]",
});

mkdirSync(`out/foo`, { recursive: true });
writeFileSync(`out/foo/meta.json`, JSON.stringify(result.metafile, null, 2));
