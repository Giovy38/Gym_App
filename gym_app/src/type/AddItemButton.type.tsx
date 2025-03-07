import { DietData } from "./DietData.type";

export type AddItemButtonType = {
    title: string;
    displayTitle: string;
    latestDiet: DietData | null;
    dayOfWeek: string;
    meal: string;
    diets: DietData[];
    selectedDiet: DietData | null;
}