import { execSync } from "node:child_process";
import path from "node:path";

import { run } from "../src";
import type { Input, SizeComparisonFilter } from "../src/types";
import { readAnalysisComment, readCurrentAnalysis } from "./helper";

describe("issues", () => {
	const fixturesPath = path.join(__dirname, "__fixtures__", "issues");

	const example = {
		name: "issue-90",
		path: path.join(fixturesPath, "issue-90"),
	};

	describe(`example ${example.name} should return no-change Total`, () => {
		const input: Input = {
			analyzerDirectory: ".analyzer",
			percentExtraAttention: 20,
			includeExtensions: [".js", ".mjs", ".cjs"],
			metafiles: ["out/meta.json"],
			name: "test",
			showDetails: false,
			topNLargestPaths: 0,
			includeSizeComparison: new Set<SizeComparisonFilter>(["total"]),
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
			expect(comment).toMatch(/\(Total\).+✅ {2}No change/i);
			expect(comment).toMatch(/\d bundles are hidden./i);
			expect(comment).not.toMatch(/‼️ \+\d+.*<!-- HIDDEN -->/);
			expect(comment).not.toMatch(/⚠️ \+\d+.*<!-- HIDDEN -->/);
			expect(comment).not.toMatch(/✅ {2}-\d+.*<!-- HIDDEN -->/);
			expect(comment).not.toMatch(/✅ {2}No change.*<!-- HIDDEN -->/i);
			expect(comment).toMatch(/🆕 Added.*<!-- HIDDEN -->/i);
			expect(comment).toMatch(/🗑️ Deleted.*<!-- HIDDEN -->/i);
		});
	});
});
