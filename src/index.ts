import parse from "node-html-parser";
import { getReports } from "./getReports";
import { transforms } from "./transforms";

const main = async () => {
	const asigareports = await getReports();
	return asigareports
		.map((report: string) => {
			return parse(report);
		})
		.map((parsed: HTMLElement) => {
			const [
				buildName,
				buildDetails,
				printerdetails,
				partsList,
				platformImage,
				partsOverview,
				buildProperties,
			] = parsed
				.querySelectorAll("h1+h3, h3+table, img.my-2.w-100")
				.map((el: HTMLElement) => transforms[el.tagName](el));
			return {
				buildName,
				buildDetails,
				printerdetails,
				partsList,
				platformImage,
				partsOverview,
				buildProperties,
			};
		});
};

main()
	.then((d) => console.log(d))
	.catch((err) => console.error(err));
