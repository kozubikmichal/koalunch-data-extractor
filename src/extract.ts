import { getDb } from "./lib/db";
import {
    FirestoreDate,
    FirestoreMenuDoc,
    FirestoreRestaurantDoc,
    Menu,
    Restaurant,
} from "./types";

const sToMs = (s: number) => s * 1000;
const nsToMs = (ns: number) => ns / 1000000;

const toTimestamp = (date?: FirestoreDate): number =>
    date ? sToMs(date._seconds) + nsToMs(date._nanoseconds) : 0;

const toMenu = (id: string, doc: FirestoreMenuDoc): Menu => ({
    id,
    timestamp: toTimestamp(doc.date),
    menu: JSON.parse(doc.menu || "{}"),
    restaurantId: doc.restaurantRef.replace("restaurants/", ""),
});

const toRestaurant = (doc: FirestoreRestaurantDoc): Restaurant => ({
    ...doc,
});

const loadRestaurants = async (): Promise<Restaurant[]> => {
    const docs = await getDb().collection("restaurants").get();
    const restaurants: Restaurant[] = [];

    docs.forEach((doc) => {
        restaurants.push(toRestaurant(doc.data() as Restaurant));
    });

    return restaurants;
};

const loadMenus = async (): Promise<Menu[]> => {
    const docs = await getDb().collection("menu").get();
    const menus: Menu[] = [];

    docs.forEach((doc) => {
        menus.push(toMenu(doc.id, doc.data() as FirestoreMenuDoc));
    });

    return menus;
};

const extract = async (): Promise<{
    restaurants: Restaurant[];
    menus: Menu[];
}> =>
    Promise.all([loadRestaurants(), loadMenus()]).then(
        ([restaurants, menus]) => ({
            restaurants,
            menus,
        })
    );

export default extract;
