import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

const CreditCardList = ({ cards, onCardClick, onDeleteCard, selected }) => {
    return Array.isArray(cards) ? <ul className="credit-card-list">
        {cards.map((card, i) => <CreditCardItem card={card} key={i} index={i} onClick={onCardClick} selected={selected === i} onDeleteCard={onDeleteCard} />)}
    </ul> : null
}

const CreditCardItem = ({ card, index, onClick, selected, onDeleteCard }) => {
    const _onClick = () => {
        onClick?.(index);
    }

    const onDelete = () => {
        onDeleteCard(index);
    }

    const { 
        cardHolderName,
        cardNumber,
        expirationDate,
        securityCode,
        country,
        address,
        addressLine2,
        city,
        state,
        postalCode,
        phone
    } = card;

    const last4 = cardNumber.split(" ")[2];

    return <li className="credit-card-item">
        <button className="credit-card-item__wrapper" onClick={_onClick}>
            <input className="credit-card-item__radio" type="radio" checked={selected} />
            <div className="credit-card-item__details">
                <div className="credit-card-item__header">
                    <div><FontAwesomeIcon icon={faCreditCard} size="2xl" className="credit-card-item__svg" /></div>
                    <div>Card Ending in {last4}</div>
                </div>
                <div className="credit-card-item__content">{cardHolderName} | exp {expirationDate}</div>
                <div className="credit-card-item__controls">
                    <button className="credit-card-item__delete" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </button>
    </li>
}

export default CreditCardList;