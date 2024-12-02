import FetchFunction from "../FetchFunction";

export default async function GetLastWorkout(id: number, exerciseIndex: number) {
    const urltry = `http://localhost:3001/training/${id}/exercise/${exerciseIndex}/last-workout`

    try {
        const response = await FetchFunction(urltry, 'GET', {});
        if (response.status === 404) {
            console.warn('No workout found for the given ID and exercise index.');
            return { lastWorkout: [] };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during training card loading:', error);
        return { lastWorkout: [] };
    }
}

