export interface TrainingCardData {
    clientId: number;
    personalTrainerId: number;
    date: string;
    useTemplate: boolean;
    workoutDays: {
        workoutName: string;
        exercises: {
            name: string;
            sets: number;
            repetitions: number;
            durationSeconds?: number;
            distanceKm?: number;
            exerciseType: string;
            restTimeSeconds?: number;
            barbellWeightKg?: number;
            notes?: string[];
        }[];
    }[];
}

export enum ExerciseType {
    cardio = 'cardio',
    stretching = 'stretching',
    withBarbell = 'withBarbell',
    withWeight = 'withWeight'
}

export interface TrainingCard extends TrainingCardData {
    id: number;
    createdAt: Date;
} 