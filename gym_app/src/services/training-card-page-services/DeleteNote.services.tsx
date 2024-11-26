import FetchFunction from "../FetchFunction";

export default async function DeleteNote(id: number, exerciseIndex: number, noteIndex: number) {
    try {

        const response = await FetchFunction(`http://localhost:3001/training/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'DELETE');

        if (!response.ok) {
            throw new Error('Error during the workout addition');
        }

        const updatedTraining = await response.json();
        return { updatedTraining };
    } catch (error) {
        console.error('Error during the workout addition:', error);
        return null;
    }
}