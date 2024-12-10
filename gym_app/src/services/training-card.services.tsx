import { singleWorkout, TrainingData } from "../type/TrainingData.type";
import FetchFunction from "./FetchFunction";

class TrainingCardService {

    // backend url 
    private TRAINING_CARD_BE_URL = 'http://localhost:3001/training';

    async createNewWorkout(id: number, exerciseIndex: number, workouts: singleWorkout[]): Promise<TrainingData | null> {
        try {
            const data = {
                workout: workouts
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/workout`, 'POST', data);

            if (!res.ok) {
                throw new Error('Error during the workout addition');
            }

            const updatedTraining: TrainingData = await res.value.json();
            return updatedTraining;
        } catch (error) {
            console.error('Error during the workout addition:', error);
            return null;
        }
    }

    async createNewTrainingCard(data: TrainingData, userId: number): Promise<void> {
        try {
            const trainingDataWithUser = { ...data, userId };
            await FetchFunction(this.TRAINING_CARD_BE_URL, 'POST', trainingDataWithUser);
            console.log('Training card created successfully', trainingDataWithUser);
        } catch (error) {
            console.error('Error during the training card creation:', error);
        }
    }

    async swapTrainingCard(id: number): Promise<TrainingData | null> {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the training card selection');
            }
            const data: TrainingData = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the training card swap:', error);
            return null;
        }
    }

    async deleteTrainingCard(id: number): Promise<TrainingData[]> {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during delete')
            }
            const data: TrainingData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the training card removal:', error);
            return [];
        }
    }

    async addNewNote(id: number, exerciseIndex: number, notes: string): Promise<TrainingData | null> {
        try {
            const data = {
                note: notes
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note`, 'POST', data);

            if (!res.ok) {
                throw new Error('Error during the note addition');
            }

            const updatedTraining: TrainingData = await res.value.json();
            return updatedTraining;
        } catch (error) {
            console.error('Error during the note addition:', error);
            return null;
        }
    }

    async editNote(id: number, exerciseIndex: number, notes: string, noteIndex: number): Promise<TrainingData | null> {
        try {
            const data = {
                note: notes
            }

            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'PUT', data);

            if (!res.ok) {
                throw new Error('Error during the note edition');
            }

            const updatedTraining: TrainingData = await res.value.json();
            return updatedTraining;
        } catch (error) {
            console.error('Error during the note edition:', error);
            return null;
        }
    }

    async deleteNote(id: number, exerciseIndex: number, noteIndex: number): Promise<TrainingData | null> {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}/${id}/exercise/${exerciseIndex}/note/${noteIndex}`, 'DELETE', {});

            if (!res.ok) {
                throw new Error('Error during the note deletion');
            }

            const updatedTraining: TrainingData = await res.value.json();
            return updatedTraining;
        } catch (error) {
            console.error('Error during the note deletion:', error);
            return null;
        }
    }

    async getLastWorkout(id: number, exerciseIndex: number): Promise<{ lastWorkout: singleWorkout[] }> {
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

    async getTrainings(userId: number): Promise<TrainingData[]> {
        try {
            const res = await FetchFunction(`${this.TRAINING_CARD_BE_URL}?userId=${userId}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during training fetch');
            }
            const data: TrainingData[] = await res.value.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the training card loading:', error);
            return [];
        }
    }



}

export const trainingCardService = new TrainingCardService();