import './styles.css';
import Image from '../image';
import { useContext } from 'react';
import { AppContext } from '../App';

const EventListItem = ({ event }) => {
    const { 
        image, 
        dateObject,
        title, 
        address,
        cta,
        status
    } = useEventListItemData({ event });

    return <EventListItemView 
        image={image}
        dateObject={dateObject}
        title={title}
        address={address}
        cta={cta}
        status={status}
    />
}

const useEventListItemData = ({ event = {} }) => {
    const { 
        imagePreview, 
        dateObject,
        title, 
        address,
        status 
    } = event;

    const { onSetEvent } = useContext(AppContext);

    const onSeeTicketClick = () => {
        onSetEvent?.(event);
    }

    return {
        image: imagePreview, 
        dateObject,
        title, 
        address,
        status,
        cta: {
            onClick: onSeeTicketClick,
            displayText: 'See Tickets',
        }
    }
}

const EventListItemView = (props) => {
    const { 
        dateObject: {
            date,
            day,
            time
        } = {},
        title,
        address,
        cta: {
            onClick,
            displayText,
            altText
        },
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
                <div className={"event-item__title"}>{title}</div>
                <div className={"event-item__address"}>{address}</div>
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