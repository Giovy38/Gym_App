import { GoPlus } from "react-icons/go";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoBody } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";



type SingleDataProps = {
    dataDate: string,
    isAdd: boolean,
    dataType: 'add' | 'training' | 'body' | 'diet',
    onClick?: () => void,
    onOpen: () => void,
}

export default function SingleData({ isAdd, dataDate, dataType, onClick, onOpen }: SingleDataProps) {
    const renderIcon = () => {
        switch (dataType) {
            case 'training':
                return <GiWeightLiftingUp />;
            case 'body':
                return <IoBody />;
            case 'diet':
                return <FaBowlFood />;
            default:
                return null;
        }
    };

    return (
        <div className="w-20 ">
            {isAdd ? (
                <div onClick={onClick} className="text-white flex flex-col items-center uppercase gap-1">
                    <div className="text-white text-3xl border-2 border-white border-dotted rounded-xl p-2 h-20 w-20 flex justify-center items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                        <GoPlus />
                    </div>
                    <p>add new</p>
                </div>
            ) : (
                <div onClick={onOpen} className="text-white flex flex-col items-center uppercase gap-1">
                    <div className="text-white text-3xl cursor-pointer bg-[#e0b462a4]  rounded-xl p-2 h-20 w-20 flex justify-center items-center hover:bg-[#f8bf58] transition-all duration-300">
                        {renderIcon()}
                    </div>
                    <p className="text-sm">{dataDate}</p>
                </div>
            )}
        </div>
    );
}