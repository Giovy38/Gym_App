import { BannerType } from '@/src/type/Banner.type'
import Image from 'next/image'



export default function Banner({ img }: BannerType) {
    return (
        <div>
            <Image src={img} alt='navbar-banner' />
        </div>
    )
}