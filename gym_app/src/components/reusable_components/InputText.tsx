import { InputTextType } from "@/src/type/InputText.type";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function InputText({ label, type, placeholder, name, value, onChange }: InputTextType) {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div className="flex flex-col gap-2 mt-2 w-full">
            <h3 className="text-[#f8bf58] capitalize font-bold text-center">{label}</h3>
            <div className="relative">
                <input
                    className="text-black p-2 text-lg rounded-full text-center w-full"
                    type={inputType}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
                    </span>
                )}
            </div>
        </div>
    );
}