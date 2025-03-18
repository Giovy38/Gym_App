import { NavbarButtonType } from "@/src/type/NavbarButton.type";

export default function NavbarButton({ title, Icon, isActive }: NavbarButtonType & { isActive: boolean }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 p-2">
            <div className={`${isActive ? 'md:bg-primary-focus md:text-text-secondary text-text-primary' : 'md:bg-bg-primary md:text-text-primary'} w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 md:hover:bg-bg-secondary hover:text-text-primary md:hover:text-text-secondary hover:cursor-pointer`}>
                <Icon />
                <h4 className="uppercase text-xl font-bold"> {title}</h4>
            </div>
        </div>
    )
}