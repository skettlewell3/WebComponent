export default function Button({ onClick, label }) {
    return (
        <button 
            className={`button ${label}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}