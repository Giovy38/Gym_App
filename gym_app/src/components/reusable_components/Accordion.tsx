'use client'

import { IoIosArrowForward, IoIosArrowBack, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import AddItemButton from "./AddItemButton";

type AccordionProps = {
    accordionTitle: string
}

export default function Accordion({ accordionTitle }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-28">
            <div
                className="bg-[#f8bf58] hover:bg-[#c69336] p-2 flex justify-center items-center gap-2 rounded-lg font-bold text-black cursor-pointer min-w-40"
                onClick={accordionOpenClose}
            >
                <h1 className="uppercase">{accordionTitle}</h1>
                <div className="block lg:hidden">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="hidden lg:block">
                    {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </div>
            </div>

            {isOpen && (
                <div className="lg:flex lg:flex-row gap-2 justify-center items-start p-2">
                    <AddItemButton title="breakfast" />
                    <AddItemButton title="snack" />
                    <AddItemButton title="lunch" />
                    <AddItemButton title="snack" />
                    <AddItemButton title="dinner" />
                </div>
            )}
        </div>
    );
}
