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
    reps: number;
    time: number;
    distanceInKm: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
    restTimeInSeconds: number;
    barbellWeight: number;
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