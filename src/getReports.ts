import "dotenv/config";
import fs from "node:fs/promises";

const { camDir, reportDir } = process.env;

export const getReports = async () => {
	const reportDirFiles = await fs.readdir(`${camDir}\\${reportDir}`);
	const reports = reportDirFiles
		.filter((fn) => fn.match(/\.html$/))
		.map(
			async (fn) =>
				await fs.readFile([camDir, reportDir, fn].join("\\"), {
					encoding: "utf-8",
				}),
		);
	return (await Promise.allSettled(reports))
		.filter((f) => f.status === "fulfilled")
		.map((d) => d.value);
};

getReports()
	.then((d) => console.log(d))
	.catch((d) => console.error(d.message));
