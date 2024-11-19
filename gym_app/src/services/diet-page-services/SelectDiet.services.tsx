import FetchFunction from "../FetchFunction";

export default async function SwapDiet(id: number) {
    try {
        const response = await FetchFunction(`http://localhost:3001/diet/${id}`, 'GET', {});
        if (!response.ok) {
            throw new Error('Error during body check selection');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during the diet selection:', error);
        return null;
    }
} 
