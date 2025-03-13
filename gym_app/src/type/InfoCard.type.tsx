export type InfoCardType = {
    infoTitle: string,
    previousData: number | string,
    currentData: number | string,
    icon?: IconType
}

export enum IconType {
    WEIGHT = "weight",
    MEASUREMENT = "measurement",
}

export type InfoCardSxDxType = {
    infoTitle: string,
    previousDataSx: number | string,
    previousDataDx: number | string,
    currentDataSx: number | string,
    currentDataDx: number | string,
    icon?: IconType
}

