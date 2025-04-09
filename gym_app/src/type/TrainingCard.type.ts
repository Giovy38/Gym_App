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
            exerciseImg?: string;
            exerciseVideo?: string;
        }[];
    }[];
}

export interface TrainingCard extends TrainingCardData {
    id: number;
    createdAt: Date;
} 