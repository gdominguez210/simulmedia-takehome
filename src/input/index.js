import './styles.css';

const Input = ({ className, children, error, label, disabled, ...props}) => {
    const _className = ["input", error && "error", disabled && "disabled", className].filter(Boolean).join(" ");

    return <>
        {label && <label className="input__label" htmlFor={props.name}>{label}</label>}
        <div className="input__wrapper">
            <input className={_className} {...props} />
            {children}
        </div>
        <div className="input__error">{error}</div>
    </>
    
}

export default Input;