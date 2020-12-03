import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import Nav from './Nav';

const MainStyle = ({ children , setAllEvents }) => {
const history = useHistory()

	// options for the IntersectionObserver constructor below
	let options = {
		root: null,
		rootMargin: '100px',
		threshold: 0.0,
	};

	let eventsToShow = 0;

	// instantiate intersection observer.
	const observer = new IntersectionObserver((entries) => {
		//for each element being observed (in this case, only 1, #bottom-boundary)....
		entries.forEach((entry) => {
			//when the element intersects the viewport, get 6 more events from the server.
			if (entry.isIntersecting) {
				eventsToShow += 6;
				getEvents(eventsToShow).then(result => {
          if(!result.ok) {
            history.push({
              pathname: '/error',
              state: {
                error: result
              }
            })
          }
        });
			}
		});
	}, options);

	//defines our backend api call to get events
	const getEvents = async (numberOfEvents) => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/events/${numberOfEvents}`
			);
			if(!response.ok) {
				const errorObject = new Error()
				errorObject.ok = response.ok
				errorObject.status = response.status
				errorObject.statusText = response.statusText
				errorObject.message = await response.text()
				throw errorObject
			}
      const newEvents = await response.json();
      newEvents.ok = true
      setAllEvents(newEvents);
      return newEvents
		} catch (error) {
			console.log('There was an error getting events from the server: ', error);
			return error
		}
  };
  
	//once, on mount, initiate intersection observer on #bottom-boundary element
	useEffect(() => {
		observer.observe(document.querySelector('#bottom-boundary'));
		// TODO set up observer.unobserve
	}, []);
  return (
    <div className='w-full'>
      {children}
      <Nav />
    </div>
  );
};

export default MainStyle;
