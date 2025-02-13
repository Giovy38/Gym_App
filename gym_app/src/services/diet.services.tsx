import { DietData } from "../type/DietData.type";
import FetchFunction from "./FetchFunction";

class DietService {

    // backend url 
    private DIET_BE_URL = 'http://localhost:3001/diet';

    async createNewDiet(data: DietData): Promise<void> {
        const dietDataWithUser = { ...data };
        await FetchFunction(this.DIET_BE_URL, 'POST', dietDataWithUser);
    }

    async addDietItem(id: number, day: string, mealType: string, newItem: string, newQuantity: string): Promise<DietData | null> {
        try {
            const data = {
                quantity: newQuantity,
                name: newItem
            };

            const res = await FetchFunction(
                `${this.DIET_BE_URL}/${id}/${day}/${mealType}`,
                'POST',
                data
            );

            if (!res.ok) {
                throw new Error('Error during the diet item addition');
            }

            // Aggiorna la dieta completa dopo l'aggiunta
            return await this.swapDiet(id);
        } catch (error) {
            console.error('Error during the diet item addition:', error);
            return null;
        }
    }

    async editDietItem(id: number, day: string, meal: string, newQuantity: string, newItem: string, idToEdit: number): Promise<DietData | null> {
        try {
            const data = {
                quantity: newQuantity,
                name: newItem
            }

            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}/${day}/${meal}/${idToEdit}`, 'PUT', data);

            if (!res.ok) {
                throw new Error('Error during the diet item edition');
            }

            const updatedDiet: DietData = await res.value.json();
            return updatedDiet;
        } catch (error) {
            console.error('Error during the diet item edition:', error);
            return null;
        }
    }

    async getDiets(): Promise<DietData[]> {
        try {
            const res = await FetchFunction(`${this.DIET_BE_URL}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during diet loading');
            }
            const data: DietData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during diet loading:', error);
            return [];
        }
    }

    async deleteDiet(id: number): Promise<DietData[]> {
        try {
            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during the diet removal');
            }
            const data: DietData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the diet removal:', error);
            return [];
        }
    }

    async deleteDietItem(id: number, day: string, meal: string, idToRemove: number): Promise<void> {
        try {
            await FetchFunction(`${this.DIET_BE_URL}/${id}/${day}/${meal}/${idToRemove}`, 'DELETE', {});
        } catch (error) {
            console.error('Error during the diet item removal:', error);
        }
    }

    async swapDiet(id: number): Promise<DietData | null> {
        try {
            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the diet selection');
            }
            const data: DietData = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the diet selection:', error);
            return null;
        }
    }


}

export const dietService = new DietService();