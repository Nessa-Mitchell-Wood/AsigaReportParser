import parse from "node-html-parser";
import { getReports } from "./getReports";

const main = async () => {
    const asigareports = await getReports()
    return asigareports.map(report => {
        return {document: parse(report), elements: []}
    }).map(report => ({document: report.document, elements: report.document.querySelectorAll('h1+table')}))
}

main().then(d => console.log(d)).catch(err => console.error(err))
