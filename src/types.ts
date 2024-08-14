interface ReportEntry {
	metafile: string;
	outfile: string;
	bytes: number;
}
export type Report = Record<string, ReportEntry>;

export interface CompareResult {
	metafile: string;
	outfile: string;
	bytes: number;
	baseBytes: number;
	remark: "added" | "deleted" | "increased" | "decreased" | "no-change";
	tree: TreeMapNode | undefined;
}

export type SizeComparisonFilter = CompareResult["remark"] | "total";

export interface Input {
	name: string;
	metafiles: Array<string>;
	includeExtensions: Array<string>;
	includeSizeComparison: Set<SizeComparisonFilter>;
	topNLargestPaths: number;
	analyzerDirectory: string;
	percentExtraAttention: number;
	showDetails: boolean;
}

export interface TreeMapNode {
	value: number;
	name: string;
	color?: Array<string>;
	path: string;
	children: TreeMapNode[];
}
