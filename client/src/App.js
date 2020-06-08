import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePromo from './components/promo/CreatePromo';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from './components/SearchEvents';
import Social from './components/Social';
import PromoState from './components/context/PromoContext/PromoState'; // promo global state management via context api. a work in progress.
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';
// TODO start using context api for global state management ASAP.

const App = () => {
  //set initial createPromo widget state.
  const [allEvents, setAllEvents] = useState([]);
  const [promoState, setPromoState] = useState({
    name: '',
    type: '',
    startDate: '',
    startTime: '',
    startDateTime: '',
    endDate: '',
    endTime: '',
    endDateTime: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    description: '',
    pictures: '', // TODO change to an array. modify mongoDB schema, and related code that parses the current data structure (primitive, string)
    picturesArr: [],
    files: null,
  });

  // options for the IntersectionObserver constructor below
  let options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.0,
  };

  let eventsToShow = 0; // TODO change this to useRef()

  // instantiate intersection observer.
  const observer = new IntersectionObserver((entries) => {
    //for each element being observed (in this case, only 1, #bottom-boundary)....
    entries.forEach((entry) => {
      // console.log(entry);
      // console.log(entry.isIntersecting);
      //when the element intersects the viewport, get 6 more events from the server.
      if (entry.isIntersecting) {
        eventsToShow += 6;
        getEvents(eventsToShow);
      }
    });
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

  //wrapper function to set an iso 8601 / rfc 3339 compliant date-time.
  const handleSetDateTime = () => {
    console.log('trigger setDateTime');
    setPromoState({
      ...promoState,
      startDateTime: new Date(
        promoState.startDate + ' ' + promoState.startTime
      ).toISOString(),
      endDateTime: new Date(
        promoState.endDate + ' ' + promoState.endTime
      ).toISOString(),
    });
  };

  const handleSetPicturesArray = () => {
    //format string
    const picturesArr = promoState.pictures
      .replace(/\n/g, ' ')
      .split(' ')
      .filter((picture) => picture !== '');
    setPromoState({ ...promoState, picturesArr: picturesArr });
  };

  //wrapper function for handling the react-quill rich-text input specifically
  const handleDescriptionChange = (value) =>
    setPromoState({ ...promoState, description: value });

  useEffect( () => {
    console.log(promoState);
  },[])
    
  useEffect(() => {
    //loads more events when viewport intersects with #bottom-boundary
    observer.observe(document.querySelector('#bottom-boundary'));
    // TODO set up observer.unobserve
  }, []);

  return (
    // <PromoState>
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
              handleSetDateTime={handleSetDateTime}
              // handleSetPicturesArray={handleSetPicturesArray}
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
    // </PromoState>
  );
};

export default App;
