import fs from "node:fs/promises";

export const handler2 = async (event: any) => {
	return fs.readFile("file.txt", "utf-8");
};
