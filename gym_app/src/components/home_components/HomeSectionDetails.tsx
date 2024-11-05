import { HomeSectionDetailsType } from '@/src/type/HomeSectionDetails.type'
import SectionTitle from '../reusable_components/SectionTitle'
import Image from 'next/image'



export default function HomeSectionDetails({ isImgRight, sectionTitle, sectionDescription, img }: HomeSectionDetailsType) {

    return (
        <div className="text-white mt-5">
            {isImgRight ? (
                // img on right for tablet and above
                <div className="hidden md:flex">
                    {/* description */}
                    <div className='w-full flex flex-col justify-around pt-5'>
                        <SectionTitle title={sectionTitle} />
                        <p className='p-3 text-balance text-center text-xl'>
                            {sectionDescription}
                        </p>
                    </div>
                    {/* img */}
                    <div className='w-full'>
                        <Image src={img} alt="training-img" />
                    </div>
                </div>
            ) : (
                // img on left for tablet and above
                <div className="hidden md:flex">
                    {/* img */}
                    <div className='w-full'>
                        <Image src={img} alt="training-img" />
                    </div>
                    {/* description */}
                    <div className='w-full flex flex-col justify-around pt-5'>
                        <SectionTitle title={sectionTitle} />
                        <p className='p-3 text-balance text-center text-xl'>
                            {sectionDescription}
                        </p>
                    </div>
                </div>
            )}

            {/* Mobile view: img on top, description below */}
            <div className="flex flex-col md:hidden">
                {/* img */}
                <div className='w-full'>
                    <Image src={img} alt="training-img" />
                </div>
                {/* description */}
                <div className='w-full flex flex-col justify-around pt-5'>
                    <SectionTitle title={sectionTitle} />
                    <p className='p-3 text-balance text-center'>
                        {sectionDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}
