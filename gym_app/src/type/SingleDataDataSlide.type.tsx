export type SingleDataType = {
    dataDate: string,
    isAdd: boolean,
    dataType: 'add' | 'training' | 'body' | 'diet',
    onClick?: () => void,
    onOpen: () => void,
    onDelete: () => void,
}