import "dotenv/config";

import extract from "./extract";

extract().then(({ restaurants, menus }) => {
    console.log(`
        ${new Date().toLocaleString()}
        extracted
            ${restaurants.length} restaurants
            ${menus.length} menus
    `);
});
