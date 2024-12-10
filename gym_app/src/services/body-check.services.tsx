import { BodyCheckData } from "../type/BodyCheckData.type";
import FetchFunction from "./FetchFunction";

class BodyCheckService {

    // backend url 
    private BODY_CHECK_BE_URL = 'http://localhost:3001/body-check';


    async createBodyCheck(data: BodyCheckData, userId: number): Promise<void> {
        const bodyCheckDataWithUser = { ...data, userId };
        FetchFunction(this.BODY_CHECK_BE_URL, 'POST', bodyCheckDataWithUser);
    }

    async deleteBodyCheck(id: number): Promise<BodyCheckData[]> {
        try {
            const res = await FetchFunction(`${this.BODY_CHECK_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during the body check removal');
            }
            const data: BodyCheckData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the body check removal:', error);
            return [];
        }
    }

    async swapBodyCheck(id: number): Promise<BodyCheckData | null> {
        try {
            const res = await FetchFunction(`${this.BODY_CHECK_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during body check selection');
            }
            const data: BodyCheckData = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the body check selection:', error);
            return null;
        }
    }

    async getBodyChecks(userId: number): Promise<BodyCheckData[]> {
        try {
            const res = await FetchFunction(`${this.BODY_CHECK_BE_URL}?userId=${userId}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during body check loading');
            }
            const data: BodyCheckData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during body check loading:', error);
            return [];
        }
    }

}

export const bodyCheckService = new BodyCheckService();