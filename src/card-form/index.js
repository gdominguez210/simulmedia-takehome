import { useState } from "react"
import Input from '../input';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

const isRequired = (value) => {
    return Boolean(value.length);
}

const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
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
    const [form, setForm] = useState(DEFAULT_FORM);
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
            <button onClick={onCancel} className="credit-card-form__back-button">
                {`< Back to Stored Cards`}
            </button>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Name on Card"
                    id="name-on-card"
                    name="cardHolderName" 
                    onChange={onChange} 
                    value={form.cardHolderName}
                    type="text"
                    onBlur={onBlur}
                    error={errors.cardHolderName}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    className="credit-card-input__card-number"
                    id="card-number"
                    name="cardNumber" 
                    label="Card Number"
                    onKeyDown={onKeyDown} 
                    onChange={onCardNumberChange}
                    value={form.cardNumber}
                    type="text"
                    onBlur={onBlur}
                    error={errors.cardNumber}
                    maxLength="19"
                />
                <div className="credit-card-input__icon"><FontAwesomeIcon icon={faCreditCard} size="2xl" className="credit-card-input__svg" /></div>
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Expiration Date"
                    error={errors.expirationDate}
                    id="expiration-date"
                    name="expirationDate" 
                    placeholder="MM/YY"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={form["expirationDate"]}
                    type="text"
                    maxLength="5"
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Security Code"
                    className="credit-card-input__security-code"
                    error={errors.securityCode}
                    id="security-code"
                    name="securityCode" 
                    placeholder="CCV"
                    onKeyDown={onKeyDown}
                    onChange={onChange} 
                    onBlur={onBlur}
                    value={form["securityCode"]}
                    type="text"
                    maxLength="3"
                >
                    <div className="credit-card-input__security-code__info">
                        <FontAwesomeIcon icon={faCreditCard} size="2xl" className="credit-card-input__svg" />
                        <span>3-digits on back of card</span>
                    </div>
                </Input>
            </div>
        </div>
        <div className="credit-card-form__row">
            <Input
                label="Country"
                value={form.country}
                readOnly
                disabled
            />
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Address"
                    id="address"
                    name="address"
                    onChange={onChange} 
                    value={form.address}
                    type="text"
                    onBlur={onBlur}
                    error={errors.address}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Address 2 (Optional)"
                    id="address-2"
                    name="addressLine2"
                    onChange={onChange} 
                    value={form.addressLine2}
                    type="text"
                    onBlur={onBlur}
                    error={errors.addressLine2}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="City"
                    id="city"
                    name="city"
                    onChange={onChange} 
                    value={form.city}
                    type="text"
                    onBlur={onBlur}
                    error={errors.city}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <Input
                label="State"
                value={form.state}
                readOnly
                disabled
            />
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Postal Code"
                    id="postal-code"
                    name="postalCode"
                    onChange={onChange} 
                    value={form.postalCode}
                    type="text"
                    onBlur={onBlur}
                    error={errors.postalCode}
                />
            </div>
        </div>
        <div className="credit-card-form__row">
            <div className="credit-card-input">
                <Input
                    label="Phone Number"
                    id="phone-number"
                    name="phone"
                    onChange={onPhoneNumberChange} 
                    value={form.phone}
                    type="tel"
                    onBlur={onBlur}
                    error={errors.phone}
                    maxLength="14"
                />
            </div>
        </div>
        <div className="credit-card-form__row credit-card-form__row--controls">
            <button className="credit-card-form__submit-button credit-card-form__submit-button--cancel" onClick={onCancel} type="button">Cancel</button>
            <button className="credit-card-form__submit-button" onClick={onClick}>Add New Card</button>
        </div>
    </form>
}

export default CreditCardForm;