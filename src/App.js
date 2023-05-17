import './App.css';
import { useState, createContext, memo } from 'react';
import { EVENTS } from './data';
import EventList from './event-list';
import EventInfo from './event-info';
import EventCheckout from './event-checkout';

const DEFAULT_CONTEXT = {
  event: null,
  checkout: null
}

export const AppContext = createContext(DEFAULT_CONTEXT);

function App() {
  const [event, setEvent] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSetEvent = (event) => {
    setEvent(event);
  }

  const onSetCheckoutInfo = (checkout) => {
    setCheckoutInfo(checkout)
  }

  const onPlaceOrder = () => {
    setShowConfirmation(true);
  }

  const context = {
    eventInfo: event,
    checkoutInfo,
    onSetEvent,
    onSetCheckoutInfo,
    onPlaceOrder
  }
  
  const showEventInfoView = event && !checkoutInfo && !showConfirmation;
  const showEventListView = !event && !checkoutInfo && !showConfirmation;
  const showCheckoutView = checkoutInfo && !showConfirmation;

  return (
    <AppContext.Provider value={context}>
      <div className="App">
        {showConfirmation && <div className="confirmation-message">Thank you! Your order has been placed.</div>}
        {showEventInfoView && <EventInfo event={event} />}
        {showEventListView && <EventList events={EVENTS} />}
        {showCheckoutView && <EventCheckout checkoutInfo={checkoutInfo} />}
      </div>
    </AppContext.Provider>
  );
}

export default memo(App);
