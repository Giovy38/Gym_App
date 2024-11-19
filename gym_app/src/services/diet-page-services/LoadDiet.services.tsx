import FetchFunction from "../FetchFunction";

export default async function LoadAllDiet() {
    try {
        const response = await FetchFunction('http://localhost:3001/diet', 'GET', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error during diet loading:', error);
        return [];
    }
}

