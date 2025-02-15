export default function SectionTitle({ title }: { title: string }) {
    return (
        <div>
            <h2 className="font-logo-font text-center text-4xl text-primary-color">{title}</h2>
        </div>
    )
}