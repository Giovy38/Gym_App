export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    rest: number;
    notes?: string;
}

export interface WorkoutDay {
    dayName: string;
    exercises: Exercise[];
}

export interface WorkoutTemplate {
    id: number;
    templateName: string;
    workoutDays: WorkoutDay[];
    personalTrainerId: number;
} 