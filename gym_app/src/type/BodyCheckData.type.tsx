export type BodyCheckData = {
    date: string;
    height: number;
    weight: number;
    shoulder: number;
    chest: number;
    waist: number;
    biceps: {
        left: number;
        right: number;
    };
    forearm: {
        left: number;
        right: number;
    };
    buttocks: number;
    thigh: number;
    quadriceps: {
        left: number;
        right: number;
    };
    calf: {
        left: number;
        right: number;
    };
}