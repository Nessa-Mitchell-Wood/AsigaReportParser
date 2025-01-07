export const transforms = {
	H3: (heading: HTMLElement) => {
		return heading.textContent.split(": ")[1];
	},
	TABLE: (table: HTMLElement) => {
		return table
			.querySelectorAll("tr, thead")
			.map((tr) => tr.querySelectorAll("th, td").map((td) => td.textContent));
	},
	IMG: (img: HTMLImageElement) => {
		return Buffer.from(
			img.attributes.src.split(",\n")[1].split("\n").join(""),
			"base64",
		);
	},
};
