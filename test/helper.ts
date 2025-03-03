import fs from "node:fs";
import path from "node:path";

interface Example {
	name: string;
	path: string;
}

export function getExampleDirectories(baseDirectory: string): Example[] {
	return fs
		.readdirSync(baseDirectory, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => {
			return {
				name: dirent.name,
				path: path.join(baseDirectory, dirent.name),
			};
		});
}

export function readCurrentAnalysis(analyzeDirectory: string) {
	return fs.readFileSync(
		path.join(process.cwd(), analyzeDirectory, "bundle_analysis.json"),
		"utf8",
	);
}

export function createDummyBaseAnalysis(
	analyzeDirectory: string,
	dummyContent: string,
) {
	// In the real world, this would pull from GitHub as part of the action flow
	fs.mkdirSync(path.join(process.cwd(), analyzeDirectory, "base/bundle"), {
		recursive: true,
	});
	fs.writeFileSync(
		path.join(
			process.cwd(),
			analyzeDirectory,
			"base/bundle/bundle_analysis.json",
		),
		dummyContent,
	);
}

export function readAnalysisComment(analyzeDirectory: string) {
	return fs.readFileSync(
		path.join(process.cwd(), analyzeDirectory, "bundle_analysis_comment.txt"),
		"utf8",
	);
}
