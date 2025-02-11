import { TrainingData } from "./TrainingData.type"

export type SingleExerciseType = {
    exerciseId: number;
    exerciseTitle: string;
    sets?: number;
    reps?: number;
    time?: number;
    distanceInKm?: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
    restTimeInSeconds?: number;
    barbellWeight?: number;
    notes: string[];
    latestTraining: TrainingData;
    dayIndex: number;
    totalWeight: number;
}