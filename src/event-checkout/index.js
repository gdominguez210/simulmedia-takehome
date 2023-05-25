import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { DELIVERY_OPTIONS, CARDS } from '../data';
import './styles.css';
import CreditCardForm from '../card-form';
import CreditCardList from '../credit-card-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EventCheckoutTile = ({ header, content }) => {
    return <div className="event-checkout__tile">
        <div className="event-checkout__tile__header">{header}</div>
        <div className="event-checkout__tile__content">{content}</div>
    </div>
}

const EventCheckout = () => {
    const { 
        checkoutInfo,
        onPlaceOrder
    } = useContext(AppContext);

    const {  
        deliveryOption,
        formattedTotalPrice,
        formattedRawPrice,
        formattedFees,
        quantity
    } = checkoutInfo;

    const [cards, setCards] = useState(CARDS);
    const [selected, setSelected] = useState(0);
    const [showCardForm, setShowCardForm] = useState(false);

    const onAddNewCard = () => {
        setShowCardForm(true);
    }

    const onSubmitNewCard = (card) => {
        setCards(prevCards => ([
            ...prevCards,
            card
        ]))

        setSelected(prevSelected => prevSelected + 1)
        setShowCardForm(false);
    }

    const onDeleteCard = (index) => {
        setCards(prevCards => prevCards.filter((_, i) => i !== index));
        setSelected(0);
    }

    const onCancelNewCard = () => {
        setShowCardForm(false);
    }

    const onCardClick = (index) => {
        setSelected(index);
    }

    return <div className="event-checkout">
        <div className="event-checkout__container">
            <div className="event-checkout-column">
                <EventCheckoutTile 
                    header={'Delivery'}
                    content={<>
                        <div className="event-delivery__title">{DELIVERY_OPTIONS[deliveryOption]?.display}</div>
                        <div className="event-delivery__content">{DELIVERY_OPTIONS[deliveryOption]?.description}</div>
                    </>}
                />
                <EventCheckoutTile 
                    header={'Payment'}
                    content={<>
                        {!showCardForm && <>
                            <div>Use Credit/Debit Card</div>
                            <CreditCardList 
                                cards={cards} 
                                onCardClick={onCardClick} 
                                onDeleteCard={onDeleteCard} 
                                selected={selected} 
                            />
                            <div className="credit-card-item__add-container">
                                <FontAwesomeIcon 
                                    className="credit-card-item__icon" 
                                    color="rgb(2, 108, 223)"
                                    icon={faPlus} 
                                    size="2xl"
                                />
                                <FontAwesomeIcon 
                                    className="credit-card-item__icon" 
                                    icon={faCreditCard} 
                                    size="2xl" 
                                /> 
                                <button 
                                    className="credit-card-item__add" 
                                    onClick={onAddNewCard}
                                >
                                    Add New Card
                                </button>
                            </div>
                        </>}
                        {showCardForm && <CreditCardForm 
                            onCancel={onCancelNewCard} 
                            onSubmit={onSubmitNewCard}
                        />}
                    </>}
                />
            </div>
            <div className="event-checkout-column event-checkout-column--right">
                <EventCheckoutTile 
                    header={<div className="event-checkout-price__row">
                        <div>Total</div>
                        <div>{formattedTotalPrice}</div>
                    </div>}
                    content={<div className="event-checkout-price__content">
                        <div className="event-checkout-price__block">
                            <div className="event-checkout-price__header">{quantity > 1 ? <>Tickets</> : <>Ticket</>}</div>
                            <div className="event-checkout-price__row">
                                <div>{formattedRawPrice} x {quantity}</div>
                                <div>{formattedRawPrice}</div>
                            </div>
                        </div>
                        <div className="event-checkout-price__block">
                            <div className="event-checkout-price__header">Fees</div>
                            <div className="event-checkout-price__row">
                                <div>{formattedFees}</div>
                                <div>{formattedFees}</div>
                            </div>
                        </div>
                        <div>
                            <button 
                                className={[
                                    "event-checkout-price__button",
                                    !cards.length && "disabled"
                                ].filter(Boolean).join(" ")}
                                onClick={onPlaceOrder}
                                disabled={!cards.length}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>}
                />
            </div>
        </div>
    </div>
}

export default EventCheckout;