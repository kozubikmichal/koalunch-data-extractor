import { CSVRow, Menu, Restaurant } from "./types";

const SEPARATOR = ";";

const REPLACER = /&quot;/g;

const buildRow = (...args: (string | number)[]) => args.join(SEPARATOR);

const transform = ({
    restaurants,
    menus,
}: {
    restaurants: Restaurant[];
    menus: Menu[];
}): {
    attributeLog: CSVRow[];
    eventLog: CSVRow[];
} => {
    const attributeLog: CSVRow[] = [
        buildRow("Case ID", "Restaurant Name", "Date"),
    ];
    const eventLog: CSVRow[] = [
        buildRow("CaseId", "EventName", "Timestamp", "Meal Name", "Meal Price"),
    ];

    const restaurantsMap = restaurants.reduce(
        (acc, restaurant) => {
            acc[restaurant.id] = restaurant;
            return acc;
        },
        {} as {
            [key: string]: Restaurant;
        }
    );

    menus.forEach((menu) => {
        let timestampOffset = 0;
        attributeLog.push(
            buildRow(
                menu.id,
                restaurantsMap[menu.restaurantId].name,
                new Date(menu.timestamp).toISOString()
            )
        );

        menu.menu.sections.forEach((section) => {
            section.meals.forEach((meal) => {
                if (!meal.name) {
                    return;
                }
                const price = parseInt(meal.price);

                if (!price) {
                    return;
                }

                eventLog.push(
                    buildRow(
                        menu.id,
                        "Meal Extracted",
                        new Date(
                            menu.timestamp + timestampOffset
                        ).toISOString(),
                        // eslint-disable-next-line quotes
                        meal.name.replace(REPLACER, '"'),
                        parseInt(meal.price)
                    )
                );
                timestampOffset += 1000;
            });
        });
    });

    return {
        attributeLog,
        eventLog,
    };
};

export default transform;
