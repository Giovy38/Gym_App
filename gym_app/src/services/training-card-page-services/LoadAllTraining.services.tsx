import FetchFunction from "../FetchFunction";

export default async function LoadAllTraining() {
    try {
        const response = await FetchFunction('http://localhost:3001/training', 'GET', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error during training card loading:', error);
        return [];
    }
}
