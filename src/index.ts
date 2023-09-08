import "dotenv/config";

import extract from "./extract";
import transform from "./transform";
import save from "./storage";

extract().then(async ({ restaurants, menus }) => {
    console.log(`
        ${new Date().toLocaleString()}
        extracted
            ${restaurants.length} restaurants
            ${menus.length} menus
    `);

    const { eventLog, attributeLog } = transform({ restaurants, menus });

    console.log(`
        ${new Date().toLocaleString()}
        transformed
            ${attributeLog.length} attribute log entried
            ${eventLog.length} event log entries
    `);

    await save("./AttributeLog.csv", attributeLog);
    await save("./EventLog.csv", eventLog);

    console.log("Done");
});
