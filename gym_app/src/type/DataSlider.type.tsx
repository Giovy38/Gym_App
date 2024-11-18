
export type DataSliderType = {
    dataPage: 'add' | 'training' | 'body' | 'diet',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdateData: (data: any) => void
}