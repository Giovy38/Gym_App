export type TrainingData = {
    id: number;
    date: string;
    workoutDays: days[];
}

export type days = {
    workoutName: string;
    exercises: Exercise[];
}

export type Exercise = {
    id: number;
    name: string;
    sets: number;
    repetitions: number;
    durationSeconds: number;
    distanceKm: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
    restTimeSeconds: number;
    barbellWeightKg: number;
    notes: string[];
    workoutSessions: WorkoutSession[];
}

export type WorkoutSession = {
    id: number;
    date: string;
    workoutSets: WorkoutSet[];
}

export type WorkoutSet = {
    setNumber: number;
    reps: number;
    weight: number;
}