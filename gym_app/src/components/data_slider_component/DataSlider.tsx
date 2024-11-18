'use client'

import React, { useEffect, useState } from 'react';
import SingleData from "./SingleData";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DataSliderType } from '@/src/type/DataSlider.type';
import NewTrainingCardForm from '../training_card_page_component/NewTrainingCardForm';
import NewBodyCheckForm from '../body_check_page_component/NewBodyCheckForm';
import NewDietForm from '../diet_page_component/NewDietForm';
import RemoveBodyCheck from '@/src/services/body-check-page-services/RemoveBodyCheck.services';

type DataSliderProps = DataSliderType & {
    onNewBodyCheck: () => void;
};

export default function DataSlider({ dataPage, onUpdateData, dbDate, onNewBodyCheck }: DataSliderProps) {
    const [dataList, setDataList] = useState([
        { id: 1, isAdd: true, dataDate: '00/00/0000', dataType: 'add' },
    ]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const formattedData = dbDate.map(item => ({
            id: item.id,
            isAdd: false,
            dataDate: item.date,
            dataType: 'body'
        }))
        setDataList([{ id: 1, isAdd: true, dataDate: '00/00/0000', dataType: 'add' }, ...formattedData]);
    }, [dbDate]);

    const addNewData = () => {
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setDataList(dataList.filter(data => data.id !== id));
        RemoveBodyCheck(id);
    };

    const handleOpen = (id: number) => {
        const selectedData = dataList.find(data => data.id === id);
        if (selectedData) {
            onUpdateData(selectedData);
        }
    };

    const renderForm = () => {
        switch (dataPage) {
            case 'training':
                return <NewTrainingCardForm onClose={() => setShowForm(false)} />;
            case 'body':
                return <NewBodyCheckForm onClose={() => setShowForm(false)} onNewBodyCheck={onNewBodyCheck} />;
            case 'diet':
                return <NewDietForm onClose={() => setShowForm(false)} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-black rounded-lg p-5 mt-3">
            {showForm && renderForm()}
            <Swiper
                key={dataList.length}
                spaceBetween={50}
                slidesPerView={2.5}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 10.5 },
                }}
                onSlideChange={() => console.log('slide change')}
            >
                {dataList.map((data) => (
                    <SwiperSlide key={data.id}>
                        <SingleData
                            isAdd={data.isAdd}
                            dataDate={data.dataDate}
                            dataType={dataPage}
                            onClick={addNewData}
                            onOpen={() => handleOpen(data.id)}
                            onDelete={() => handleDelete(data.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}