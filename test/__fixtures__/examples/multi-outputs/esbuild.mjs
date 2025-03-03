import { writeFileSync, mkdirSync } from "node:fs";
import { build } from "esbuild";

const result = await build({
	entryPoints: [`./src/alpha.ts`, `./src/beta.ts`],
	outdir: `out`,
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

mkdirSync(`out/bar`, { recursive: true });
writeFileSync(`out/bar/meta.json`, JSON.stringify(result.metafile, null, 2));
