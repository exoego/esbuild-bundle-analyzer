import { writeFileSync } from "node:fs";
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

writeFileSync(`out/meta.json`, JSON.stringify(result.metafile, null, 2));
