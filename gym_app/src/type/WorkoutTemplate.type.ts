export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    rest: number;
    notes?: string;
    exerciseType?: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
    barbellWeightKg?: number;
    durationSeconds?: number;
    distanceKm?: number;
}

export interface WorkoutDay {
    dayName: string;
    exercises: Exercise[];
}

export interface WorkoutTemplate {
    id: number;
    name: string;
    type: string;
    workoutDays: WorkoutDay[];
    trainerId: number;
} 