import { execSync } from "node:child_process";
import path from "node:path";

import { run } from "../src/index";
import type { Options } from "../src/types";
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

	for (const example of getExampleDirectories(fixturesPath)) {
		describe(`example ${example.name}`, () => {
			const metafiles =
				example.name === "multi-metafiles"
					? ["out/meta1.json", "out/meta2.json"]
					: ["out/meta.json"];

			const input: Options = {
				analyzerDirectory: ".analyzer",
				budgetPercentIncreaseRed: 20,
				metafiles,
				name: "test",
				showDetails: false,
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
				expect(comment).toMatch(/‼️ \+\d+/);
				expect(comment).toMatch(/⚠️ \+\d+/);
				expect(comment).toMatch(/✅ {2}-\d+/);
				expect(comment).toMatch(/✅ {2}No change/i);
				expect(comment).toMatch(/🆕 Added/i);
				expect(comment).toMatch(/🗑️ Deleted/i);
			});
		});
	}
});
