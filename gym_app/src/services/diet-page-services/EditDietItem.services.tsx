import FetchFunction from "../FetchFunction";

export default async function EditDietItem(id: number, day: string, meal: string, newQuantity: string, newItem: string, idToEdit: number) {
    try {

        const data = {
            quantity: newQuantity,
            name: newItem
        };

        const response = await FetchFunction(`http://localhost:3001/diet/${id}/${day}/${meal}/${idToEdit}`, 'PUT', data);
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