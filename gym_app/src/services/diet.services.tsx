import { DietData } from "../type/DietData.type";
import FetchFunction from "./FetchFunction";

class DietService {

    // backend url 
    private DIET_BE_URL = 'http://localhost:3001/diet';

    async CreateNewDiet(data: DietData) {
        FetchFunction(this.DIET_BE_URL, 'POST', data);
    }

    async AddDietItem(id: number, day: string, meal: string, newItem: string, newQuantity: string) {
        try {
            const data = {
                item: {
                    quantity: newQuantity,
                    name: newItem
                }
            }

            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}/${day}/${meal}`, 'POST', data);

            if (!res.ok) {
                throw new Error('Error during the diet item addition');
            }

            const updatedDiet = await res.value.json();
            return { updatedDiet };
        } catch (error) {
            console.error('Error during the diet item addition:', error);
            return null;
        }
    }

    async EditDietItem(id: number, day: string, meal: string, newQuantity: string, newItem: string, idToEdit: number) {
        try {
            const data = {
                quantity: newQuantity,
                name: newItem
            }

            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}/${day}/${meal}/${idToEdit}`, 'PUT', data);

            if (!res.ok) {
                throw new Error('Error during the diet item edition');
            }

            const updatedDiet = await res.value.json();
            return { updatedDiet };
        } catch (error) {
            console.error('Error during the diet item edition:', error);
            return null;
        }
    }

    async GetAllDiet() {
        try {
            const res = await FetchFunction(this.DIET_BE_URL, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during diet loading');
            }
            const data = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during diet loading:', error);
            return [];
        }
    }

    async DeleteDiet(id: number) {
        try {
            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during the diet removal');
            }
            const data = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the diet removal:', error);
            return [];
        }
    }

    async DeleteDietItem(id: number, day: string, meal: string, idToRemove: number) {
        try {
            await FetchFunction(`${this.DIET_BE_URL}/${id}/${day}/${meal}/${idToRemove}`, 'DELETE', {});
        } catch (error) {
            console.error('Error during the diet item removal:', error);
        }
    }

    async SwapDiet(id: number) {
        try {
            const res = await FetchFunction(`${this.DIET_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the diet selection');
            }
            const data = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the diet selection:', error);
            return null;
        }
    }


}

export const dietService = new DietService();