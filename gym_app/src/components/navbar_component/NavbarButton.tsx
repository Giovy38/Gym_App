import { NavbarButtonType } from "@/src/type/NavbarButton.type";

export default function NavbarButton({ title, Icon, isActive }: NavbarButtonType & { isActive: boolean }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 p-2">
            <div className={`${isActive ? 'md:bg-primary-focus md:text-text-secondary' : 'md:bg-bg-primary md:text-text-primary'} w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 hover:bg-bg-secondary hover:text-text-secondary hover:cursor-pointer`}>
                <Icon />
                <h4 className="uppercase text-xl font-bold"> {title}</h4>
            </div>
            {isActive && (
                <div className="md:hidden w-[90%] h-2 rounded md:bg-primary-focus md:w-[80px] bg-bg-primary">
                </div>
            )}
        </div>
    )
}