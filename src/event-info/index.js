import './styles.css';
import Image from '../image';
import EventInfoTicket from '../event-info-ticket';

const EventInfo = ({ event }) => {
    const {
        dateObject: {
            date,
            day,
            time
        } = {},
        title,
        ticket,
        address,
        agePolicy,
        ticketLimit
    } = event;

    return <div className="event-info">
        <div className="event-info__container">
            <div className="event-info__header">
                <h1>{title}</h1>
                <div>{day} &#8226; {date} &#8226; {time} </div>
                <div>{address}</div>
            </div>
            <div className="event-info__image">
                <Image altText={title} width={305} height={226} />
            </div>
            <div className="event-info__details">
                <div><b>Event Ticket Limit:</b> {ticketLimit}</div>
                <div><b>Age Policy:</b> {agePolicy}</div>
            </div>
            <EventInfoTicket ticket={ticket} ticketLimit={ticketLimit} />
        </div>
    </div>
}

export default EventInfo;