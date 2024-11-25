import FetchFunction from "../FetchFunction";
import { TrainingData } from "@/src/type/TrainingData.type";

export default async function CreateNewTrainingCard(data: TrainingData) {
    FetchFunction('http://localhost:3001/training', 'POST', data);
}



