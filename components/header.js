export default function Header({ title = 'Garrett Bland' }) {
    return (
        <div>
            <h1 className="font-bold text-xl">{title}</h1>
        </div>
    )
}
