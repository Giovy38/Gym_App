import FetchFunction from "../FetchFunction";

export default async function LoadAllBodyCheck() {
    try {
        const response = await FetchFunction('http://localhost:3001/body-check', 'GET', {});
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Errore durante il caricamento dei body check:', error);
        return [];
    }
}