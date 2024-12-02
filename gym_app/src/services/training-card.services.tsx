import { singleWorkout, TrainingData } from "../type/TrainingData.type";
import FetchFunction from "./FetchFunction";

class TrainingCardService {

    // backend url 
    private TRAINING_CARD_BE_URL = 'http://localhost:3001/training';

    async AddNewWorkout(id: number, exerciseIndex: number, workouts: singleWorkout[]) {
        try {
            const data = {
                workout: workouts
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/workout`, 'POST', data);

            if (!res.ok) {
                throw new Error('Error during the workout addition');
            }

            const updatedTraining = await res.value.json();
            return { updatedTraining };
        } catch (error) {
            console.error('Error during the workout addition:', error);
            return null;
        }
    }

    async CreateNewTrainingCard(data: TrainingData) {
        FetchFunction(this.TRAINING_CARD_BE_URL, 'POST', data);
    }

    async SwapTrainingCard(id: number) {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the training card selection');
            }
            const data = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the training card swap:', error);
            return null;
        }
    }

    async DeleteTrainingCard(id: number) {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during delete')
            }
            const data = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the training card removal:', error);
            return [];
        }
    }

    async AddNewNote(id: number, exerciseIndex: number, notes: string) {
        try {
            const data = {
                note: notes
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note`, 'POST', data);

            if (!res.ok) {
                throw new Error('Error during the note addition');
            }

            const updatedTraining = await res.value.json();
            return { updatedTraining };
        } catch (error) {
            console.error('Error during the note addition:', error);
            return null;
        }
    }

    async EditNote(id: number, exerciseIndex: number, notes: string, noteIndex: number) {
        try {
            const data = {
                note: notes
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'PUT', data);

            if (!res.ok) {
                throw new Error('Error during the note edition');
            }

            const updatedTraining = await res.value.json();
            return { updatedTraining };
        } catch (error) {
            console.error('Error during the note edition:', error);
            return null;
        }
    }

    async DeleteNote(id: number, exerciseIndex: number, noteIndex: number) {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'DELETE', {});

            if (!res.ok) {
                throw new Error('Error during the note deletion');
            }

            const updatedTraining = await res.value.json();
            return { updatedTraining };
        } catch (error) {
            console.error('Error during the note deletion:', error);
            return null;
        }
    }

    async GetLastWorkout(id: number, exerciseIndex: number) {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/last-workout`, 'GET', {});

            if (res.ok) {
                return res.value.json();
            }

            if (res.error.status === 404) {
                return { lastWorkout: [] }
            }

            throw new Error('Error during the workout selection');

        } catch (error) {
            console.error('Error during the workout selection:', error);
            throw new Error('Error during the workout selection');
        }
    }

    async GetAllTraining() {
        try {
            const res = await FetchFunction(this.TRAINING_CARD_BE_URL, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during training fetch')
            }
            const data = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the training card loading:', error);
            return [];
        }
    }



}

export const trainingCardService = new TrainingCardService();