

import { IconType } from "react-icons";

type NavbarButtonProps = {
    title: string,
    Icon: IconType
}

export default function NavbarButton({ title, Icon }: NavbarButtonProps) {
    return (
        <div className='w-full text-center flex justify-center items-center gap-2 rounded-t-xl p-2 hover:bg-[#e0a740] hover:text-black hover:font-bold hover:cursor-pointer'>
            <Icon />
            <h4 className="uppercase"> {title}</h4>
        </div>
    )
}