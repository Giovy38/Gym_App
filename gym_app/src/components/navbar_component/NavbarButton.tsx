import { NavbarButtonType } from "@/src/type/NavbarButton.type";

export default function NavbarButton({ title, Icon, isActive }: NavbarButtonType & { isActive: boolean }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 p-2">
            <div className={`${isActive ? 'md:bg-[#e0a740] md:text-black' : 'md:bg-black md:text-white'} w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 hover:bg-white hover:text-black hover:cursor-pointer`}>
                <Icon />
                <h4 className="uppercase text-xl font-bold"> {title}</h4>
            </div>
            {isActive && (
                <div className="md:hidden w-[90%] h-2 rounded md:bg-[#e0a740] md:w-[80px] bg-black">
                </div>
            )}
        </div>
    )
}