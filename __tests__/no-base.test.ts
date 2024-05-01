import { execSync } from "node:child_process";
import path from "node:path";
import { compare } from "../src/compare";
import { report } from "../src/report";
import type { Options } from "../src/types";
import {
	createDummyBaseAnalysis,
	getExampleDirectories,
	readAnalysisComment,
	readCurrentAnalysis,
} from "./helper";

describe("examples w/o base analysis", () => {
	const fixturesPath = path.join(__dirname, "__fixtures__", "examples");
	for (const example of getExampleDirectories(fixturesPath)) {
		describe(`example ${example.name}`, () => {
			const input: Options = {
				analyzerDirectory: ".analyzer",
				percentExtraAttention: 20,
				includeExtensions: [".js", ".mjs", ".cjs"],
				metafiles: ["out/meta.json"],
				name: "test",
				showDetails: false,
			};

			beforeEach(() => {
				process.chdir(example.path);
				execSync("npm ci");
				execSync("npm run build");
			});

			test(`bundle analysis action generates report and compares artifacts correctly ${example.name}`, () => {
				report(input);
				const bundleAnalysis = readCurrentAnalysis(input.analyzerDirectory);
				expect(bundleAnalysis.length).toBeGreaterThan(1);

				createDummyBaseAnalysis(input.analyzerDirectory, bundleAnalysis);

				compare(input);
				const comment = readAnalysisComment(input.analyzerDirectory);
				expect(comment).toMatch(/no changes to the esbuild bundle/i);
			});
		});
	}
});
