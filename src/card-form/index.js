import { useState } from "react"
import Input from '../input';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { v4 } from 'uuid';

const isRequired = (value) => {
    return Boolean(value.length);
}

const DEFAULT_FORM = {
    cardHolderName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'United States',
    address: '',
    addressLine2: '',
    city: '',
    state: 'New York',
    postalCode: '',
    phone: ''
}

const VALIDATE_OBJECT = {
    cardHolderName: {
        onValidate: isRequired,
        message: 'Please enter your first and last name.'
    },
    cardNumber: {
        onValidate: (value) => {
            return value.length === 19;
        },
        message: 'Please enter a valid credit card number.'
    },
    expirationDate: {
        onValidate: (value) => {
            return value.length === 5;
        },
        message: 'Please enter your card expiration date.'
    },
    securityCode: {
        onValidate: (value) => {
            return value.length === 3;
        },
        message: 'Please enter your card security code.'
    },
    address: {
        onValidate: isRequired,
        message: 'Please enter your billing address.'
    },
    city: {
        onValidate: isRequired,
        message: 'Please enter your billing city.'
    },
    state: {
        onValidate: isRequired,
        message: 'Please enter your billing state.'
    },
    postalCode: {
        onValidate: isRequired,
        message: 'Please enter your billing postal code.'
    },
    phone: {
        onValidate: isRequired,
        message: 'Please enter a valid phone number.'
    }
}

const CreditCardForm = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({ ...DEFAULT_FORM, _id: v4() });
    const [errors, setErrors] = useState({})

    const onChange = (e) => {
        if (e) {
            setForm(prevForm => ({
                ...prevForm,
                [e.target.name]: e.target.value
            }))

            setErrors(prevErrors => {
                const newErrors = { ...prevErrors }

                delete newErrors[e.target.name];

                return newErrors;
            })
        }
    }

    const onKeyDown = (e) => {
        if (!(/^[0-9]$/i.test(e.key) ||  e.key === 'Backspace' || e.key === 'Tab' || e.key === 'Enter')) {
            e.preventDefault();
        }
    }

    const onCardNumberChange = (e) => {
        if (
            e.target.value.length > form[e.target.name].length && 
            e.target.value.length < 19
        ) {
            e.target.value = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        }

        onChange(e);
    }

    const onPhoneNumberChange = (e) => {
        if (e.target.value.length > form[e.target.name].length) {
            const currentValue = e.target.value.replace(/[^\d]/g, '');
            const cvLength = currentValue.length;
            
        
              if (cvLength > 4 && cvLength < 7) {
                e.target.value = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
              } else if (cvLength > 7) {
                  e.target.value = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
              }
        }

        onChange(e);
    }

    const onValidate = (input) => {
        if (VALIDATE_OBJECT[input]) {
            const isValid = VALIDATE_OBJECT[input].onValidate(form[input]);
        
            if (!isValid) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [input]: VALIDATE_OBJECT[input].message
                }))
            }
        }
    }

    const onBlur = (e) => {
        const input = e.target.name;
        
        onValidate(input);
    }

    const onClick = () => {
        Object.keys(form).forEach(input => onValidate(input));

        if (Object.entries(errors).length) return;

        onSubmit?.(form);
    }

    return <form onSubmit={(e) => { e.preventDefault() }} >
        <div className="credit-card-form__row">
            <button 
                className="credit-card-form__back-button"
                onClick={onCancel} 
            >
                {`< Back to Stored Cards`}
            </button>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.cardHolderName}
                    label="Name on Card"
                    onBlur={onBlur}
                    onChange={onChange} 
                    name="cardHolderName" 
                    type="text"
                    value={form.cardHolderName}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    className="credit-card-input__card-number"
                    error={errors.cardNumber}
                    label="Card Number"
                    maxLength="19"
                    name="cardNumber" 
                    onBlur={onBlur}
                    onChange={onCardNumberChange}
                    onKeyDown={onKeyDown} 
                    type="text"
                    value={form.cardNumber}
                />
                <div className="credit-card-input__icon">
                    <FontAwesomeIcon 
                        className="credit-card-input__svg" 
                        icon={faCreditCard} 
                        size="2xl" 
                    />
                </div>
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.expirationDate}
                    label="Expiration Date"
                    maxLength="5"
                    name="expirationDate" 
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="MM/YY"
                    type="text"
                    value={form.expirationDate}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    className="credit-card-input__security-code"
                    error={errors.securityCode}
                    label="Security Code"
                    maxLength="3"
                    name="securityCode" 
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder="CCV"
                    type="text"
                    value={form.securityCode}
                >
                    <div className="credit-card-input__security-code__info">
                        <FontAwesomeIcon 
                            className="credit-card-input__svg" 
                            icon={faCreditCard} 
                            size="2xl" 
                        />
                        <span>3-digits on back of card</span>
                    </div>
                </Input>
            </div>
        </div>
        <div className="credit-card-form__row">
            <Input
                disabled
                label="Country"
                readOnly
                value={form.country}
            />
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.address}
                    label="Address"
                    name="address"
                    onBlur={onBlur}
                    onChange={onChange} 
                    type="text"
                    value={form.address}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Address 2 (Optional)"
                    name="addressLine2"
                    onBlur={onBlur}
                    onChange={onChange} 
                    type="text"
                    value={form.addressLine2}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.city}
                    label="City"
                    name="city"
                    onBlur={onBlur}
                    onChange={onChange} 
                    type="text"
                    value={form.city}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <Input
                disabled
                label="State"
                readOnly
                value={form.state}
            />
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.postalCode}
                    label="Postal Code"
                    name="postalCode"
                    onBlur={onBlur}
                    onChange={onChange} 
                    type="text"
                    value={form.postalCode}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    error={errors.phone}
                    label="Phone Number"
                    maxLength="14"
                    name="phone"
                    onBlur={onBlur}
                    onChange={onPhoneNumberChange} 
                    type="tel"
                    value={form.phone}
                />
            </div>
        </div>
        <div className="credit-card-form__row credit-card-form__row--controls">
            <button 
                className="credit-card-form__submit-button credit-card-form__submit-button--cancel" 
                onClick={onCancel} 
                type="button"
            >
                Cancel
            </button>
            <button 
                className="credit-card-form__submit-button" 
                onClick={onClick}
            >
                Add New Card
            </button>
        </div>
    </form>
}

export default CreditCardForm;