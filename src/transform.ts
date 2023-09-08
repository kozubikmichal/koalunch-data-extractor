import { CSVRow, Menu } from "./types";

const transform = (
    input: Menu[]
): {
    attributeLog: CSVRow[];
    eventLog: CSVRow[];
} => {
    console.log("Original Data: ", input.length);

    const attributeLog: CSVRow[] = [];
    const eventLog: CSVRow[] = [];

    // input.forEach((data) => {

    // });

    return {
        attributeLog,
        eventLog,
    };
};
