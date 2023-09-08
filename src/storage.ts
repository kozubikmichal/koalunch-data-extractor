import fs from "node:fs/promises";
import { CSVRow } from "./types";

const save = (filename: string, data: CSVRow[]): Promise<void> =>
    fs.writeFile(filename, data.join("\n"));

export default save;
