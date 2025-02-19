export enum DayOfWeek {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday'
}

export enum MealType {
    breakfast = 'breakfast',
    morningSnack = 'morningSnack',
    lunch = 'lunch',
    afternoonSnack = 'afternoonSnack',
    dinner = 'dinner'
}

export type DietData = {
    id: number;
    date: string;
    dailyDiets: DailyDiet[];
}

export type DailyDiet = {
    id: number;
    day: DayOfWeek;
    dailyMenu: DailyMenu;
}

export type DailyMenu = {
    id: number;
    menuItems: MenuItem[];
}

export type MenuItem = {
    id: number;
    mealType: MealType;
    meal: Meal;
}

export type Meal = {
    id: number;
    quantity: string;
    name: string;
}









