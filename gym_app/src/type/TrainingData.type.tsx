export type TrainingData = {
    id: number;
    workoutDays: days[];
    date: string;
}

export type days = {
    workoutName: string;
    exercises: Exercise[];
}


export type Exercise = {
    index: number;
    name: string;
    sets: number;
    reps: number;
    restTime: {
        minutes: number;
        seconds: number;
    };
    barbell: boolean;
    barbellWeight: number;
    Workouts: LastWorkout[];
    notes: string[];
}

type LastWorkout = {
    lastWorkout: singleWorkout[];
}

export type singleWorkout = {
    sets: number;
    reps: number;
    weight: number;
}