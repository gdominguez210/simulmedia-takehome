import './styles.css';
import { useId } from 'react';

const Input = ({ className, children, disabled, error, label, ...props}) => {
    const _className = [
        "input", 
        disabled && "input--disabled", 
        error && "input--error", 
        className
    ].filter(Boolean).join(" ");

    const id = useId();

    return <>
        {label && <label 
            className="input__label" 
            htmlFor={id}
        >
            {label}
        </label>}
        <div className="input__wrapper">
            <input
                id={id}
                aria-describedby={`${id}-error`} 
                className={_className} 
                {...props}
            />
            {children}
        </div>
        <div
            aria-live="polite"
            className="input__error"
            id={`${id}-error`} 
        >
            {error}
        </div>
    </>
    
}

export default Input;