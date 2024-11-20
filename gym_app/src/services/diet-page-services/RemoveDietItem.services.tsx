import FetchFunction from "../FetchFunction";


export default async function RemoveDietItem(id: number, day: string, meal: string, idToRemove: number) {
    try {
        await FetchFunction(`http://localhost:3001/diet/${id}/${day}/${meal}/${idToRemove}`, 'DELETE', {});
    } catch (error) {
        console.error('Error during the diet item addition:', error);
    }
}