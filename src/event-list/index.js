import './styles.css';
import Image from '../image';
import { useContext } from 'react';
import { AppContext } from '../App';

const EventListItem = ({ event }) => {
    const { 
        address,
        cta,
        dateObject,
        image, 
        title
    } = useEventListItemData({ event });

    return <EventListItemView 
        address={address}
        cta={cta}
        dateObject={dateObject}
        image={image}
        title={title}
    />
}

const useEventListItemData = ({ event = {} }) => {
    const { 
        imagePreview, 
        dateObject,
        title, 
        address
    } = event;

    const { onSetEvent } = useContext(AppContext);

    const onSeeTicketClick = () => {
        onSetEvent?.(event);
    }

    return {
        address,
        dateObject,
        image: imagePreview, 
        title, 
        cta: {
            displayText: 'See Tickets',
            onClick: onSeeTicketClick
        }
    }
}

const EventListItemView = (props) => {
    const { 
        address,
        cta: {
            onClick,
            displayText,
            altText
        } = {},
        dateObject: {
            date,
            day,
            time
        } = {},
        title,
    } = props;

    return <li className="event-item">
        <div className="event-item__content">
            <div className="event-item__image">
                <Image 
                    altText={title} 
                    height={46} 
                    width={82} 
                />
            </div>
            <div className="event-item__datetime">
                <div className="event-item__date">{date}</div>
                <div className="event-item__day">{day} &#8226; {time}</div>
            </div>
            <div className="event-item__details">
                <div className="event-item__title">{title}</div>
                <div className="event-item__address">{address}</div>
            </div>
        </div>
        <div className="event-item__control">
            <button 
                alt={altText}
                className={"event-item__button"} 
                onClick={onClick} 
            >
                {displayText}
            </button>
        </div>
    </li>
}


const EventList = ({ events }) => {
    return Array.isArray(events) ? <ul className="event-list">
        {events.map((event) => <EventListItem event={event} key={event._id} />)}
    </ul> : null;
}

export default EventList;