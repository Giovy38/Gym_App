import { BodyCheckData } from "@/src/type/BodyCheckData.type";
import FetchFunction from "../FetchFunction";



export default async function AddBodyCheck(data: BodyCheckData) {
    FetchFunction('http://localhost:3001/body-check', 'POST', data);
}


