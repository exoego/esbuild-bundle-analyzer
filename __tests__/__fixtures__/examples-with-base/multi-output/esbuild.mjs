import { writeFileSync } from "node:fs";
import { build } from "esbuild";
import metaUrlPlugin from '@chialab/esbuild-plugin-meta-url';

const result = await build({
	entryPoints: [
		`./src/no-change.ts`,
		`./src/bit-increased.ts`,
		`./src/much-increased.ts`,
		`./src/decreased.ts`,
		`./src/new-outfile.ts`,
		`./src/file-imported.ts`,
	],
	outdir: `out`,
	format: "esm",
	metafile: true,
	mainFields: ["module", "main"],
	platform: "node",
	target: "node20.9",
	bundle: true,
	plugins: [
		metaUrlPlugin(),
	],
	sourcemap: true,
});

writeFileSync(`out/meta.json`, JSON.stringify(result.metafile, null, 2));
