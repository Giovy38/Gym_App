import { DietData } from "@/src/type/DietData.type";
import FetchFunction from "../FetchFunction";

export default async function AddNewDiet(data: DietData) {
    FetchFunction('http://localhost:3001/diet', 'POST', data);
}