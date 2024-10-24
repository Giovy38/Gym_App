'use-client'

import SectionTitle from './SectionTitle'
import Image, { StaticImageData } from 'next/image'

type HomeSectionProps = {
    isImgRight: boolean,
    sectionTitle: string,
    sectionDescription: string,
    img: string | StaticImageData
}

export default function HomeSectionDetails({ isImgRight, sectionTitle, sectionDescription, img }: HomeSectionProps) {

    return (
        <div>

            {isImgRight ?
                // img on right
                <div className="text-white flex mt-5">
                    {/* description */}
                    <div className='w-full flex flex-col justify-around pt-5'>
                        <SectionTitle title={sectionTitle} />
                        <p className=' p-3 text-balance text-center'>
                            {sectionDescription}
                        </p>
                    </div>
                    {/* img */}
                    <div className='w-full'>
                        <Image src={img} alt="training-img" />
                    </div>
                </div>

                :
                // img on left
                <div className="text-white flex mt-5">
                    {/* img */}
                    <div className='w-full'>
                        <Image src={img} alt="training-img" />
                    </div>
                    {/* description */}
                    <div className='w-full flex flex-col justify-around pt-5'>
                        <SectionTitle title={sectionTitle} />
                        <p className=' p-3 text-balance text-center'>
                            {sectionDescription}
                        </p>
                    </div>

                </div>}


        </div>
    )
}