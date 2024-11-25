import FetchFunction from "../FetchFunction";

export default async function RemoveTraining(id: number) {
    try {
        const response = await FetchFunction(`http://localhost:3001/training/${id}`, 'DELETE', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error during the training card removal:', error);
        return [];
    }
}
