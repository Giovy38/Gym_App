export type PersonalTrainerData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: "male" | "female";
    isEnabled: boolean;
    isMaster: boolean;
}