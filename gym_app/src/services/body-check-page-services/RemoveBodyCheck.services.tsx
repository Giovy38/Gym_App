import FetchFunction from "../FetchFunction";

export default async function RemoveBodyCheck(id: number) {
    try {
        const response = await FetchFunction(`http://localhost:3001/body-check/${id}`, 'DELETE', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Errore durante il caricamento dei body check:', error);
        return [];
    }
}
