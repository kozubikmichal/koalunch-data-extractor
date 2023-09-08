export type Restaurant = {
    id: string;
    name: string;
};

export type MealData = {
    name: string;
    price: string;
};

export type MenuSectionData = {
    name?: string;
    meals: MealData[];
};

export type MenuData = {
    sections: MenuSectionData[];
};

export type Menu = {
    id: string;
    restaurantId: string;
    menu: MenuData;
    timestamp: number;
};

export type FirestoreMenuDoc = {
    menu: string;
    date: FirestoreDate;
    restaurantRef: string;
};

export type FirestoreRestaurantDoc = {
    id: string;
    name: string;
};

export type FirestoreDate = {
    _seconds: number;
    _nanoseconds: number;
};

export type CSVRow = string;
