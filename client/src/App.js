import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';
import CreatePromo from './components/promo/CreatePromo';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from "./components/SearchEvents"

function App() {
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
    files: undefined,
  });

  const getEvents = async () => {
    const allEvents = await fetch('http://localhost:3001/api/events');
    return allEvents.json();
  };

  const handleSetAllEvents = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  const handlePromoStateChange = (e) => {
    console.log("heres the name", e.target.name)
    console.log("heres the value", e.target.value)
    setPromoState({ ...promoState, [e.target.name]: e.target.value });
  }

  const handleDescriptionChange = (value) =>
    setPromoState({ ...promoState, description: value });

  useEffect(() => {
    getEvents().then((result) => {
      //TO-DO include some validation / error handling here
      if (result.length > 0) {
        setAllEvents([...allEvents, ...result]);
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
