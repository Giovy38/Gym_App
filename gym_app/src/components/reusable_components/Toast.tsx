export default function Toast({ message, color }: { message: string, color: 'green' | 'red' }) {
    return (
        <div className={`fixed right-5 bottom-5 text-white p-3 rounded ${color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
        </div>
    )
}