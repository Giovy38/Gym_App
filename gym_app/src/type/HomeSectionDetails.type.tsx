import { StaticImageData } from "next/image"

export type HomeSectionDetailsType = {
    isImgRight: boolean,
    sectionTitle: string,
    sectionDescription: string,
    img: string | StaticImageData
}