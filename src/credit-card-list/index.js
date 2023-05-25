import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

const CreditCardList = ({ cards, onCardClick, onDeleteCard, selected }) => {
    return Array.isArray(cards) ? <ul className="credit-card-list">
        {cards.map((card, i) => { 
            return <CreditCardItem 
                card={card} 
                index={i} 
                key={card._id} 
                onClick={onCardClick} 
                onDeleteCard={onDeleteCard} 
                selected={selected === i} 
            />
        })}
    </ul> : null
}

const CreditCardItem = (props) => {
    const {
        card, 
        index, 
        onClick, 
        onDeleteCard,
        selected, 
    } = props;

    const { 
        cardHolderName,
        cardNumber,
        expirationDate,
    } = card;

    const last4 = cardNumber.split(" ")[2];

    const _onClick = () => {
        onClick?.(index);
    }

    const onDelete = () => {
        onDeleteCard(index);
    }

    return <li className="credit-card-item">
        <button className="credit-card-item__wrapper" onClick={_onClick}>
            <input 
                className="credit-card-item__radio" 
                checked={selected} 
                type="radio"
                onChange={() => null}
            />
            <div className="credit-card-item__details">
                <div className="credit-card-item__header">
                    <div>
                        <FontAwesomeIcon 
                            className="credit-card-item__svg" 
                            icon={faCreditCard} 
                            size="2xl" 
                        />
                    </div>
                    <div>Card Ending in {last4}</div>
                </div>
                <div className="credit-card-item__content">
                    {cardHolderName} | exp {expirationDate}
                </div>
                <div className="credit-card-item__controls">
                    <div 
                        className="credit-card-item__delete" 
                        onClick={onDelete}
                        role="button"
                        tabIndex="0"
                    >
                        Delete
                    </div>
                </div>
            </div>
        </button>
    </li>
}

export default CreditCardList;