type PrimaryButtonProps = {
    text: string
}

export default function PrimaryButton({ text }: PrimaryButtonProps) {
    return (
        <div className="bg-[#eac174] font-bold rounded-md p-2 text-center mt-5 cursor-pointer hover:text-black hover:bg-[#f8bf58] ">
            <button className="uppercase font-bold">{text}</button>
        </div>
    )
}