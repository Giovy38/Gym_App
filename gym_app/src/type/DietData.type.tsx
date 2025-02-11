export type DietData = {
    id: number;
    date: string;
    dailyDiets: DailyDiet[];
}

export type DailyDiet = {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    dailyMenu: DailyMenu;
}

export type DailyMenu = {
    id: number;
    menuItems: MenuItem[];
}

export type MenuItem = {
    mealType: 'breakfast' | 'snack' | 'lunch' | 'snack2' | 'dinner';
    meal: MealItem;
}

export type MealItem = {
    quantity: string;
    name: string;
}

