import FetchFunction from "../FetchFunction";

export default async function RemoveDiet(id: number) {
    try {
        const response = await FetchFunction(`http://localhost:3001/diet/${id}`, 'DELETE', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error during the diet removal:', error);
        return [];
    }
}

