'use client'

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { AccordionType } from "@/src/type/Accordion.type";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';




export default function Accordion({ accordionTitle, buttons }: AccordionType) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateIsOpen = () => {
            if (window.innerWidth >= 1024) { // 1024px è una dimensione comune per i laptop
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        updateIsOpen(); // Imposta lo stato iniziale
        window.addEventListener('resize', updateIsOpen); // Aggiungi listener per il ridimensionamento

        return () => {
            window.removeEventListener('resize', updateIsOpen); // Pulisci il listener
        };
    }, []);

    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col lg:min-h-28 md:w-1/2 w-full">
            <div
                className="bg-black hover:bg-[#111111] p-2 flex justify-center items-center gap-2 rounded-lg font-bold text-[#f8bf58] cursor-pointer min-w-40 md:min-w-72"
                onClick={accordionOpenClose}
            >
                <h1 className="uppercase">{accordionTitle}</h1>
                <div>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {isOpen && (
                <div className="flex flex-col gap-2 justify-center items-center p-2">
                    <Swiper
                        spaceBetween={10}
                        modules={[Scrollbar, Navigation]}
                        slidesPerView={1.1}
                        scrollbar={{
                            el: '.custom-scrollbar',
                            draggable: true,
                        }}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        style={{ cursor: 'grab', width: '100%' }}
                    >
                        {buttons.map((button, index) => (
                            <SwiperSlide key={index}>
                                {button}
                            </SwiperSlide>
                        ))}

                        <div className="custom-next swiper-button-next !text-[#f8bf58]"></div>
                        <div className="custom-prev swiper-button-prev !text-[#f8bf58] "></div>

                        <div className="custom-scrollbar swiper-scrollbar !bg-black">
                            <div className="swiper-scrollbar-drag !bg-[#f8bf58] rounded"></div>
                        </div>
                    </Swiper>
                </div>
            )}
        </div>
    );
}
