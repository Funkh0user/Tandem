import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePromo from './components/promo/CreatePromo';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from './components/SearchEvents';
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';

const App = () => {
  //@TO-DO start using context api for global state management ASAP.

  //set initial createPromo widget state.
  const [allEvents, setAllEvents] = useState([]);
  const [eventsShowing, setEventsShowing] = useState(10);
  const [promoState, setPromoState] = useState({
    name: '',
    type: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    pictures: '',
    files: null,
  });

  //reducer function for handling lazy loading events state
  const eventReducer = (state, action) => {
    switch (action.type) {
      case 'LOAD_NEXT_EVENTS':
        return { ...state, events: state.events.concat(action.events) };///////////////////////////bug, infinitely adds events to the dom.
      case 'LOADING_EVENTS':
        return { ...state, loading: action.loading };
      default:
        return state;
    }
  };
  //initialize react useReducer hook with eventreducer, as well as the initial state of the object the reducer will operate on. (very similar to useState())
  const [eventState, eventDispatch] = useReducer(eventReducer, {
    loading: false,
    events: [],
  });

  //defines our backend api call to get events
  const getEvents = async (numberOfEvents) => {
    eventDispatch({ type: 'LOADING_EVENTS', loading: true });
    handleSetEventsShowing(10);
    try {
      const events = await fetch(
        `http://localhost:3001/api/events/${numberOfEvents}`
      );
      const newData = await events.json();
      eventDispatch({ type: 'LOAD_NEXT_EVENTS', events: newData });//////////////////////////////////bug, infinitely adds events to the dom
      eventDispatch({ type: 'LOADING_EVENTS', loading: false });
      return newData;
    } catch (error) {
      console.log(error);
    }
  };

  //wrapper function to add a new event to allEvents
  const handleSetAllEvents = (newEvent) => {
    setAllEvents(allEvents + newEvent);
  };

  //wrapper function for setting the number of events to display on the page
  const handleSetEventsShowing = (newEvents) => {
    setEventsShowing(eventsShowing + newEvents);
  };

  //wrapper function for updating controlled form state
  const handlePromoStateChange = (e) => {
    setPromoState({ ...promoState, [e.target.name]: e.target.value });
  };

  //wrapper function for handling the react-quill rich-text input specifically
  const handleDescriptionChange = (value) =>
    setPromoState({ ...promoState, description: value });

  //options for the IntersectionObserver constructor below
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  //instantiate observer.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      console.log(entry.isIntersecting);
      handleSetEventsShowing(10);
      getEvents(eventsShowing);
    });
  }, options);

  console.log(typeof target);
  console.log(eventState);
  console.log(eventsShowing);

  useEffect(() => {
    //load 10 events initially
    getEvents(eventsShowing).then((result) => {
      if (result.length > 0) {
        try {
          setAllEvents([...allEvents, ...result]);
        } catch (error) {
          console.log(error);
        }
      }
      //set observer to observe the bottom boundary element on our page. when it intersects with the viewport, run handleSetEventsShowing and getevents(eventsShowing)
      observer.observe(document.querySelector('#bottom-boundary'));
    });
  }, []);

  return (
    <Router>
      <MainStyle>
        {console.log('app re rendered')}
        <Switch>
          <Route exact path='/'>
          {/* allEvents is from our useState hook, eventState.events comes from our useReducer hook, make a choice  */}
            <Home allEvents={allEvents} eventState={eventState.events}/>
          </Route>
          <Route exact path='/create'>
            <CreatePromo
              promoState={promoState}
              handlePromoStateChange={handlePromoStateChange}
              handleDescriptionChange={handleDescriptionChange}
              handleSetAllEvents={handleSetAllEvents}
            />
          </Route>
          <Route path='/search'>
            <SearchEvents />
          </Route>
        </Switch>
      </MainStyle>
    </Router>
  );
};

export default App;
