import { TrainingData } from "./TrainingData.type"

export type SingleExerciseType = {
    index: number;
    exerciseTitle: string,
    reps: number,
    sets: number,
    restTime: number,
    totalweight: number,
    barbell: boolean,
    note: string[],
    cardio: boolean,
    barbellWeight: number,
    latestTraining: TrainingData
}