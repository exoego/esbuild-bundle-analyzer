import { calculateTotalRow } from "../src/compare";

describe("calculateTotalRow", () => {
	test("empty returns zero", () => {
		expect(calculateTotalRow([])).toEqual({
			baseBytes: 0,
			bytes: 0,
			metafile: "(Total)",
			outfile: "-",
			remark: "no-change",
			tree: undefined,
		});
	});

	describe("single row", () => {
		test("given decreased, return decreased", () => {
			expect(
				calculateTotalRow([
					{
						baseBytes: 100,
						bytes: 50,
						metafile: "",
						outfile: "",
						remark: "decreased",
						tree: undefined,
					},
				]),
			).toEqual({
				baseBytes: 100,
				bytes: 50,
				metafile: "(Total)",
				outfile: "-",
				remark: "decreased",
				tree: undefined,
			});
		});
		test("given increased, return increased", () => {
			expect(
				calculateTotalRow([
					{
						baseBytes: 50,
						bytes: 100,
						metafile: "",
						outfile: "",
						remark: "increased",
						tree: undefined,
					},
				]),
			).toEqual({
				baseBytes: 50,
				bytes: 100,
				metafile: "(Total)",
				outfile: "-",
				remark: "increased",
				tree: undefined,
			});
		});
		test("given no-change, return no-change", () => {
			expect(
				calculateTotalRow([
					{
						baseBytes: 50,
						bytes: 50,
						metafile: "",
						outfile: "",
						remark: "no-change",
						tree: undefined,
					},
				]),
			).toEqual({
				baseBytes: 50,
				bytes: 50,
				metafile: "(Total)",
				outfile: "-",
				remark: "no-change",
				tree: undefined,
			});
		});
		test("given added, return increased", () => {
			expect(
				calculateTotalRow([
					{
						baseBytes: 0,
						bytes: 50,
						metafile: "",
						outfile: "",
						remark: "added",
						tree: undefined,
					},
				]),
			).toEqual({
				baseBytes: 0,
				bytes: 50,
				metafile: "(Total)",
				outfile: "-",
				remark: "increased",
				tree: undefined,
			});
		});
		test("given deleted, return decreased", () => {
			expect(
				calculateTotalRow([
					{
						baseBytes: 50,
						bytes: 0,
						metafile: "",
						outfile: "",
						remark: "deleted",
						tree: undefined,
					},
				]),
			).toEqual({
				baseBytes: 50,
				bytes: 0,
				metafile: "(Total)",
				outfile: "-",
				remark: "decreased",
				tree: undefined,
			});
		});
	});
});
