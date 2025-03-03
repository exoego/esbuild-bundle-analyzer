import { writeFileSync } from "node:fs";
import { build } from "esbuild";

const result = await build({
	entryPoints: [`./src/no-change.ts`],
	outdir: `out`,
	format: "esm",
	metafile: true,
	mainFields: ["module", "main"],
	platform: "node",
	target: "node20.9",
	bundle: true,
	plugins: [],
});

writeFileSync(`out/meta1.json`, JSON.stringify(result.metafile, null, 2));
