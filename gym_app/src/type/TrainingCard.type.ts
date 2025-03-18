export interface TrainingCardData {
    clientId: number;
    templateId: number;
    startDate: Date;
    endDate: Date;
    notes?: string;
}

export interface TrainingCard extends TrainingCardData {
    id: number;
    personalTrainerId: number;
    createdAt: Date;
} 