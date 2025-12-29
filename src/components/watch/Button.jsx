export default function Button({ onClick, label }) {
    return (
        <div 
            className={`button ${label}`}
            onClick={onClick}
        >
            {label}
        </div>
    )
}