import FetchFunction from "../FetchFunction";

export default async function EditNote(id: number, exerciseIndex: number, notes: string, noteIndex: number) {
    try {
        const data = {
            note: notes
        }

        const response = await FetchFunction(`http://localhost:3001/training/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'PUT', data);

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