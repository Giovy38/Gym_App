export type DietData = {
    id: number;
    date: string;
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
    saturday: MealPlan;
    sunday: MealPlan;
}

export type MealPlan = {
    breakfast: MealItem[];
    snack: MealItem[];
    lunch: MealItem[];
    snack2: MealItem[];
    dinner: MealItem[];
}

export type MealItem = {
    quantity: string;
    name: string;
}

