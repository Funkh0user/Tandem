import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePromo from './components/promo/CreatePromo';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from "./components/SearchEvents"
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';

const App = () => {
  //set initial createPromo widget state. 
  //@TO-DO start using context api for global state management ASAP.
  const [allEvents, setAllEvents] = useState([]);
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

  //defines our backend api call to get all our events
  const getEvents = async () => {
    try {
      const allTheEvents = await fetch('http://localhost:3001/api/events');
      return allTheEvents.json();
    } catch(error) {
      console.error(error.message)
    }
  };

  //wrapper function for add a new event to allEvents
  const handleSetAllEvents = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  //wrapper function for updating controlled form state
  const handlePromoStateChange = (e) => {
    setPromoState({ ...promoState, [e.target.name]: e.target.value });
  }

  //wrapper function for handling the react-quill rich-text input specifically
  const handleDescriptionChange = (value) =>
    setPromoState({ ...promoState, description: value });

  //call getEvents whenever app is rendered. 
  useEffect(() => {
    getEvents().then((result) => {
      //TO-DO include some validation / error handling here
      if (result.length > 0) {
        try {
          setAllEvents([...allEvents, ...result]);
        } catch(error) {
          console.log(error.message)
        }
      }
    });
  }, []);

  return (
    <Router>
      <MainStyle>
      {console.log("app re rendered")}
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
        </Switch>
      </MainStyle>
    </Router>
  );
}

export default App;
