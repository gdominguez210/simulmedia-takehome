import './styles.css';

const Input = ({ className, children, disabled, error, label, ...props}) => {
    const _className = [
        "input", 
        disabled && "input--disabled", 
        error && "input--error", 
        className
    ].filter(Boolean).join(" ");

    return <>
        {label && <label 
            className="input__label" 
            htmlFor={props.name}
        >
            {label}
        </label>}
        <div className="input__wrapper">
            <input 
                ariaDescribedBy={`${props.name}-error`} 
                className={_className} 
                {...props} 
            />
            {children}
        </div>
        <div
            ariaLive="polite"
            className="input__error"
            id={`${props.name}-error`} 
        >
            {error}
        </div>
    </>
    
}

export default Input;