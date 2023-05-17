import { useState } from 'react';
import { TICKET_TYPES } from "../data";
import './styles.css';
import ToggleSwitch from '../toggle-switch';
import { useContext } from 'react';
import { AppContext } from '../App';

const MIN_QUANTITY = 1;

const EventTicket = ({ ticket, ticketLimit }) => {
    const {
        rawPrice,
        fees,
        totalPrice,
        type,
        deliveryOptions
    } = ticket;

    const { onSetCheckoutInfo } = useContext(AppContext);

    const [showFees, setShowFees] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const changeQuantity = (val) => {
        setQuantity(quantity => {
            if (quantity === MIN_QUANTITY && val < 0) { return; }
            if (quantity === ticketLimit && val > 0) { return; }
            return quantity + val;
        })
    }

    const onToggleFees = () => {
        setShowFees(prevState => !prevState);
    }

    const formatDisplayPrice = (value) => {
        const priceWithCents = value?.toFixed(2);

        return `$${priceWithCents}`; 
    }

    const formattedTotalPrice = formatDisplayPrice(showFees ? (Math.round(100 * (totalPrice * quantity)) / 100) : (Math.round(100 * (rawPrice * quantity)) / 100));
    const formattedRawPrice = formatDisplayPrice(rawPrice);
    const formattedFees = formatDisplayPrice(fees);

    const showDecreaseQuantity = quantity > 1;
    const increaseQuantityEnabled = ticketLimit ? quantity < ticketLimit : true;

    const onClick = (e) => {
        e?.stopPropagation();
        onSetCheckoutInfo({ 
            quantity, 
            deliveryOption: deliveryOptions[0],
            formattedTotalPrice,
            formattedRawPrice,
            formattedFees,
            rawPrice,
            fees,
            totalPrice
        });
    }

    return <div className="event-price">
        <div className="event-price__fees">
            <div>Show Prices With Fees</div>
            <div><ToggleSwitch onClick={onToggleFees} checked={showFees} /></div>
        </div>
        <div className="event-ticket">
            <div className="event-ticket__details">
                <div className="event-ticket__type">
                    {TICKET_TYPES[type]}
                </div>
                <div className="event-ticket__price">
                    {!showFees && <>{formattedRawPrice} ea + fees</>}
                    {showFees && <>
                        <div>{formattedTotalPrice} ea</div>
                        <div className="event-ticket__price-with-fees">({formattedRawPrice} + {formattedFees} fees)</div>
                    </>}
                </div>
            </div>
            <div className="event-ticket__controls">
                {showDecreaseQuantity && <button 
                    className="event-ticket__controls__button event-ticket__controls__button--remove" 
                    onClick={() => changeQuantity(-1)}
                >
                    -
                </button>}
                <span className="event-ticket__controls__quantity">{quantity}</span>
                {<button
                    disabled={!increaseQuantityEnabled}
                    className={[
                        "event-ticket__controls__button", 
                        "event-ticket__controls__button--add", 
                        !increaseQuantityEnabled && "disabled"
                    ].filter(Boolean).join(" ")}
                    onClick={() => changeQuantity(1)}
                >
                    +
                </button>}
            </div>
        </div>
        <div className="event-checkout-info">
            <div className="event-checkout-info__subtotal">
                <div>
                    <b>
                        {!showFees && <>SubTotal</>}
                        {showFees && <>Total</>}
                    </b>
                </div>
                <div>
                    {formattedTotalPrice}                    
                </div>
            </div>
            <div className="event-checkout-info__quantity">
                {quantity} {quantity > 1 ? <>Tickets</> : <>Tickets</>}
            </div>
            {showFees && <div className="event-checkout-info__price-breakdown">
                <div className="event-checkout-info__price-item">
                    <div>Face Value</div>
                    <div>{formattedRawPrice}</div>
                </div>
                <div className="event-checkout-info__price-item">
                    <div>Fees</div>
                    <div>{formattedFees}</div>
                </div>
            </div>}
            <button className="event-checkout-info__button" onClick={onClick}>Next</button>
        </div>
    </div>
}

export default EventTicket;