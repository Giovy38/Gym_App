import FetchFunction from "../FetchFunction";

export default async function SwapBodyCheck(id: number) {
    // questa funzione permette di cambiare il body check visualizzato nella pagina del body check con un altro body check presente nel database

    try {
        const response = await FetchFunction(`http://localhost:3001/body-check/${id}`, 'GET', {});
        if (!response.ok) {
            throw new Error('Error during body check selection');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during the body check selection:', error);
        return null;
    }
}