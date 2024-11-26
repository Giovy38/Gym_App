import FetchFunction from "../FetchFunction";

export default async function AddNewNote(id: number, exerciseIndex: number, notes: string) {
    try {
        const data = {
            note: notes
        }

        const response = await FetchFunction(`http://localhost:3001/training/${id}/exercise/${exerciseIndex}/note`, 'POST', data);

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