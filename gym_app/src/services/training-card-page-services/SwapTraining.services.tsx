import FetchFunction from "../FetchFunction";

export default async function SwapTraining(id: number) {
    try {
        const response = await FetchFunction(`http://localhost:3001/training/${id}`, 'GET', {});
        if (!response.ok) {
            throw new Error('Error during training card selection');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during training card selection:', error);
        return null;
    }
}

