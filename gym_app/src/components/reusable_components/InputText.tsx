type InputTextProps = {
    label: string,
    type: 'email' | 'password' | 'text',
    placeholder: string
}

export default function InputText({ label, type, placeholder }: InputTextProps) {
    return (
        <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-[#f8bf58] capitalize font-bold text-center">{label}</h3>
            <input className="text-black p-2 text-lg rounded-full text-center" type={type} placeholder={placeholder} />
        </div>
    )
}