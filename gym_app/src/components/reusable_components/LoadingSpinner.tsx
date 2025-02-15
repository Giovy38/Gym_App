import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <FaSpinner className="text-text-primary text-4xl animate-spin" />
        </div>
    );
}