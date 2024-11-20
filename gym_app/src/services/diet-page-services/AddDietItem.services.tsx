import FetchFunction from "../FetchFunction";


export default async function AddDietItem(id: number, day: string, meal: string, newItem: string, newQuantity: string) {
    try {

        const data = {
            item: {
                quantity: newQuantity,
                name: newItem
            }
        };

        const response = await FetchFunction(`http://localhost:3001/diet/${id}/${day}/${meal}`, 'POST', data);

        // Log della risposta per il debug
        console.log('Response:', response);

        if (!response.ok) {
            throw new Error('Error during the diet item addition');
        }

        const updatedDiet = await response.json();
        return { updatedDiet };
    } catch (error) {
        console.error('Error during the diet item addition:', error);
        return null;
    }
}