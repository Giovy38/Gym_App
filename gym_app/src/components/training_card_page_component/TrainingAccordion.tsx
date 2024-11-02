'use client'

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { TrainingAccordionType } from "@/src/type/TrainingAccordion.type";


export default function TrainingAccordion({ accordionTitle, buttons }: TrainingAccordionType) {
    const [isOpen, setIsOpen] = useState(false);

    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col ">
            <div
                className="text-[#f8bf58] p-2 flex justify-center items-center gap-2 rounded-lg font-bold bg-black cursor-pointer w-full mt-5"
                onClick={accordionOpenClose}
            >
                <h1 className="uppercase">{accordionTitle}</h1>
                <div className="block">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {isOpen && (
                <div className="flex flex-wrap gap-2 justify-center items-start p-2">
                    {buttons}
                </div>
            )}
        </div>
    );
}
