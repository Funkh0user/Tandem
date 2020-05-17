import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePromo from './components/promo/CreatePromo';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from './components/SearchEvents';
import Social from './components/Social'
import SimpleExample from "./components/SimpleExample"
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';
//@TO-DO start using context api for global state management ASAP.

const App = () => {
  
  //set initial createPromo widget state.
  const [allEvents, setAllEvents] = useState([]);
  const [promoState, setPromoState] = useState({
    name: '',
    type: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    description: '',
    pictures: '',
    files: null,
  });

  // options for the IntersectionObserver constructor below
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  
  let eventsToShow = 0

  // instantiate intersection observer.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      console.log(entry.isIntersecting);
    });
    eventsToShow += 4 
    getEvents(eventsToShow);
  }, options);

  //defines our backend api call to get events
  const getEvents = async (numberOfEvents) => {
    try {
      const events = await fetch(
        `http://localhost:3001/api/events/${numberOfEvents}`
      );
      const newData = await events.json();
      setAllEvents([...allEvents, ...newData]);
      return newData;
    } catch (error) {
      console.log(error);
    }
  };

  //wrapper function to add a new event to allEvents
  const handleSetAllEvents = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  //wrapper function for updating controlled form state
  const handlePromoStateChange = (e) => {
    setPromoState({ ...promoState, [e.target.name]: e.target.value });
  };

  //wrapper function for handling the react-quill rich-text input specifically
  const handleDescriptionChange = (value) =>
    setPromoState({ ...promoState, description: value });

  useEffect(() => {
    //load events
    observer.observe(document.querySelector('#bottom-boundary'));
  }, []);

  return (
    <Router>
      <MainStyle>
        <Switch>
          <Route exact path='/'>
            <Home allEvents={allEvents} />
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
          <Route path='/social'>
            <Social />
          </Route>
        </Switch>
      </MainStyle>
    </Router>
  );
};

export default App;
