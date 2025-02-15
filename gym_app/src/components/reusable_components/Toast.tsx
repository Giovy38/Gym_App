export default function Toast({ message, color }: { message: string, color: 'green' | 'red' }) {
    return (
        <div className={`fixed right-5 bottom-5 text-text-primary p-3 rounded ${color === 'green' ? 'bg-toast-success' : 'bg-toast-error'}`}>
            {message}
        </div>
    )
}