import { BodyCheckData } from "./BodyCheckData.type"

export type DataSliderType = {
    dataPage: 'add' | 'training' | 'body' | 'diet',
    dbDate: BodyCheckData[] // | triningData[] | dietData[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdateData: (data: any) => void
}