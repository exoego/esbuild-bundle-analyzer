import { execSync } from "node:child_process";
import path from "node:path";

import { run } from "../src/index";
import type { Input } from "../src/types";
import {
	getExampleDirectories,
	readAnalysisComment,
	readCurrentAnalysis,
} from "./helper";

describe("examples w/ base analysis", () => {
	const fixturesPath = path.join(
		__dirname,
		"__fixtures__",
		"examples-with-base",
	);

	for (const [index, example] of getExampleDirectories(
		fixturesPath,
	).entries()) {
		describe(`example ${example.name}`, () => {
			const metafiles =
				example.name === "multi-metafiles"
					? ["out/meta1.json", "out/meta2.json"]
					: ["out/meta.json"];

			const isEven = index % 2 === 0;
			const input: Input = {
				analyzerDirectory: ".analyzer",
				percentExtraAttention: 20,
				includeExtensions: [".js", ".mjs", ".cjs"],
				metafiles,
				name: "test",
				showDetails: false,
				showNoChange: isEven,
				topNLargestPaths: 10,
				showTotalChanges: isEven,
			};

			beforeEach(() => {
				process.chdir(example.path);
				execSync("npm ci");
				execSync("npm run build");
			});

			test(`bundle analysis action generates report and compares artifacts correctly ${example.name}`, () => {
				run(input);

				const bundleAnalysis = readCurrentAnalysis(input.analyzerDirectory);
				expect(bundleAnalysis.length).toBeGreaterThan(1);

				const comment = readAnalysisComment(input.analyzerDirectory);
				expect(comment).not.toMatch(/no changes to the esbuild bundle/i);
				expect(comment).not.include(".js.map");
				expect(comment).not.include(".wasm");
				expect(comment).toMatch(/\.[cm]?js /i);
				expect(comment).toMatch(/‼️ \+\d+/);
				expect(comment).toMatch(/⚠️ \+\d+/);
				expect(comment).toMatch(/✅ {2}-\d+/);
				expect(comment).toMatch(/✅ {2}No change/i);
				if (isEven) {
					expect(comment).not.toMatch(/\d bundles with no change are hidden./i);
					expect(comment).toMatch(/\(Total\) \| - \|.+⚠️/i);
				} else {
					expect(comment).toMatch(/\d bundles with no change are hidden./i);
					expect(comment).not.toMatch(/\(Total\) \| - \|.+⚠️/i);
				}
				expect(comment).toMatch(/🆕 Added/i);
				expect(comment).toMatch(/🗑️ Deleted/i);
			});
		});
	}
});
