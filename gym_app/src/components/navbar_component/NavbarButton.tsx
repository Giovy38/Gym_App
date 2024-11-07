import { NavbarButtonType } from "@/src/type/NavbarButton.type";

export default function NavbarButton({ title, Icon }: NavbarButtonType) {
    return (
        <div className='w-full text-center flex justify-center items-center gap-2 rounded-t-xl p-2 hover:bg-[#e0a740] hover:text-black hover:font-bold hover:cursor-pointer'>
            <Icon />
            <h4 className="uppercase text-xl font-bold"> {title}</h4>
        </div>
    )
}