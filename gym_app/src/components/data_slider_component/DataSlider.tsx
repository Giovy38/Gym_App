'use client'

import React, { useEffect, useState } from 'react';
import SingleData from "./SingleData";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DataSliderType } from '@/src/type/DataSlider.type';
import NewTrainingCardForm from '../training_card_page_component/NewTrainingCardForm';
import NewBodyCheckForm from '../body_check_page_component/NewBodyCheckForm';
import NewDietForm from '../diet_page_component/NewDietForm';
import { DietData } from '@/src/type/DietData.type';
import { TrainingData } from '@/src/type/TrainingData.type';
import { bodyCheckService } from '@/src/services/body-check.services';
import { dietService } from '@/src/services/diet.services';
import { trainingCardService } from '@/src/services/training-card.services';
import { BodyCheckData } from '@/src/type/BodyCheckData.type';

type DataSliderProps = DataSliderType & {
    onNewBodyCheck: (() => void);
    onNewDiet: (() => void);
    onRemoveDiet: (() => void);
    onRemoveTraining: (() => void);
    onUpdateSelectedData: ((selectedData: DietData | BodyCheckData | TrainingData) => void);
    onNewTraining: (() => void);
};

export default function DataSlider({ dataPage, onUpdateData, dbDate, onNewBodyCheck, onNewDiet, onNewTraining, onRemoveDiet, onUpdateSelectedData, onRemoveTraining }: DataSliderProps) {
    const [dataList, setDataList] = useState([
        { id: 1, isAdd: true, dataDate: '00/00/0000', dataType: 'add' },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const formattedData = dbDate.map(item => ({
            id: item.id,
            isAdd: false,
            dataDate: item.date,
            dataType: dataPage
        }));

        setDataList([{ id: 1, isAdd: true, dataDate: '00/00/0000', dataType: 'add' }, ...formattedData]);

        // Seleziona automaticamente l'ultimo elemento non-add se esiste
        if (formattedData.length > 0) {
            const lastItem = formattedData[formattedData.length - 1];
            setSelectedId(lastItem.id);
        }
    }, [dataPage, dbDate]);

    const addNewData = () => {
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        setDataList(dataList.filter(data => data.id !== id));
        switch (dataPage) {
            case 'body':
                await bodyCheckService.deleteBodyCheck(id);
                onNewBodyCheck();
                break;
            case 'diet':
                await dietService.deleteDiet(id);
                onRemoveDiet();
                break;
            case 'training':
                await trainingCardService.deleteTrainingCard(id);
                onRemoveTraining();
                break;
        }
    };

    const handleOpen = async (id: number) => {
        setSelectedId(id);
        let selectedData;
        switch (dataPage) {
            case 'body':
                selectedData = await bodyCheckService.swapBodyCheck(id);
                if (selectedData) {
                    console.log("Selected Data:", selectedData);
                    onUpdateData(selectedData);
                    onUpdateSelectedData(selectedData);
                }
                break;
            case 'diet':
                selectedData = await dietService.swapDiet(id);
                if (selectedData) {
                    console.log("Selected Data:", selectedData);
                    onUpdateData(selectedData);
                    onUpdateSelectedData(selectedData);
                }
                break;
            case 'training':
                selectedData = await trainingCardService.swapTrainingCard(id);
                console.log("training change", selectedData)
                if (selectedData) {
                    console.log("Selected Data:", selectedData);
                    onUpdateData(selectedData);
                    onUpdateSelectedData(selectedData);
                }
                break;
        }
    };

    const renderForm = () => {
        switch (dataPage) {
            case 'training':
                return <NewTrainingCardForm onClose={() => setShowForm(false)} onNewTraining={onNewTraining} />;
            case 'body':
                return <NewBodyCheckForm onClose={() => setShowForm(false)} onNewBodyCheck={onNewBodyCheck} />;
            case 'diet':
                return <NewDietForm onClose={() => setShowForm(false)} onNewDiet={onNewDiet} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-bg-primary rounded-lg p-5 mt-3">
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
                            isSelected={data.id === selectedId}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
