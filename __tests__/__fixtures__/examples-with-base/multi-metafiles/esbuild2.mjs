import { writeFileSync } from "node:fs";
import { build } from "esbuild";

const result = await build({
	entryPoints: [
		`./src/bit-increased.ts`,
		`./src/much-increased.ts`,
		`./src/decreased.ts`,
		`./src/new-outfile.ts`,
	],
	outdir: `out`,
	format: "esm",
	metafile: true,
	mainFields: ["module", "main"],
	platform: "node",
	target: "node24",
	bundle: true,
	plugins: [],
});

writeFileSync(`out/meta2.json`, JSON.stringify(result.metafile, null, 2));
