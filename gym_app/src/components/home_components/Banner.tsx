import Image, { StaticImageData } from 'next/image'

type BannerProps = {
    img: string | StaticImageData
}

export default function Banner({ img }: BannerProps) {
    return (
        <div>
            <Image src={img} alt='navbar-banner' />
        </div>
    )
}