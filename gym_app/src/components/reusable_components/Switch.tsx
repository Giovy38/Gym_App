export default function Switch({
    checked,
    onChange,
    activeColor = 'bg-green-400',
    inactiveColor = 'bg-red-400'
}: {
    checked: boolean;
    onChange: () => void;
    activeColor?: string;
    inactiveColor?: string;
}) {
    return (
        <div>
            <div className="flex items-center cursor-pointer" onClick={onChange}>
                <div className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${checked ? activeColor : inactiveColor}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}