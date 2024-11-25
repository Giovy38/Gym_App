import { singleWorkout } from "@/src/type/TrainingData.type";
import FetchFunction from "../FetchFunction";

export default async function AddNewWorkout(id: number, exerciseIndex: number, workouts: singleWorkout[]) {
    try {
        const data = {
            workout: workouts
        }

        const response = await FetchFunction(`http://localhost:3001/training/${id}/exercise/${exerciseIndex}/workout`, 'POST', data);

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