import { BodyCheckData } from "./BodyCheckData.type"
import { DietData } from "./DietData.type"

export type DataSliderType = {
    dataPage: 'add' | 'training' | 'body' | 'diet',
    dbDate: BodyCheckData[] | DietData[] // | triningData[] 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdateData: (data: any) => void
}