import { TrainingData } from "./TrainingData.type"

export type SingleExerciseType = {
    exerciseId: number;
    exerciseTitle: string;
    sets?: number;
    repetitions?: number;
    durationSeconds?: number;
    distanceKm?: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
    restTimeSeconds?: number;
    barbellWeightKg?: number;
    notes: string[];
    latestTraining: TrainingData;
    dayIndex: number;
    totalWeight: number;
    exerciseImg?: string;
    exerciseVideo?: string;
}