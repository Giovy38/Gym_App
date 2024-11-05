'use client'

import React, { useState } from 'react';
import SingleData from "./SingleData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import { DataSliderType } from '@/src/type/DataSlider.type';

export default function DataSlider({ dataPage }: DataSliderType) {
    const [dataList, setDataList] = useState([
        { id: 1, isAdd: true, dataDate: '31/10/2024', dataType: 'add' },
        { id: 2, isAdd: false, dataDate: '01/10/2024', dataType: dataPage },
        // Aggiungi altri elementi con un campo `id` univoco
    ]);

    const addNewData = () => {
        const currentDate = new Date().toLocaleDateString('it-IT');
        const newId = dataList.length ? Math.max(...dataList.map(data => data.id)) + 1 : 1;
        setDataList([...dataList, { id: newId, isAdd: false, dataDate: currentDate, dataType: dataPage }]);
    };

    const handleSwiper = (swiper: SwiperType) => {
        console.log(swiper);
    };

    const handleDelete = (id: number) => {
        setDataList(dataList.filter(data => data.id !== id));
    };

    return (
        <div className="w-full bg-black rounded-lg p-5 mt-3">
            <Swiper
                key={dataList.length}
                spaceBetween={50}
                slidesPerView={2.5}
                breakpoints={{
                    640: {
                        slidesPerView: 2.5,
                    },
                    768: {
                        slidesPerView: 3.5,
                    },
                    1024: {
                        slidesPerView: 4.5,
                    },
                    1280: {
                        slidesPerView: 10.5,
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={handleSwiper}
            >
                {dataList.map((data) => (
                    <SwiperSlide key={data.id}>
                        <SingleData
                            isAdd={data.isAdd}
                            dataDate={data.dataDate}
                            dataType={dataPage}
                            onClick={addNewData}
                            onOpen={() => console.log('open')}
                            onDelete={() => handleDelete(data.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}