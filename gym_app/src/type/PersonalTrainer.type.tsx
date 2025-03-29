export type PersonalTrainerData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isEnabled?: boolean;
    gender: "male" | "female";
}