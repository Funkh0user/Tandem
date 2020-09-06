/** @format */

import React, { useState, useEffect } from 'react';
import EventPageCard from './EventPageCard';

//this component, as well as its child eventPageCard, are responsible for displaying data about an event on a distinct page with a unique url.
const Event = (props) => {
	//this grabs the parameter from the url with the name of the event.
	const {
		params: { eventName },
	} = props.match;
	
	//create some state to hold data about the event the user is viewing
	const [eventState, setEventState] = useState({});
	const [coords, setCoords] = useState({
		lat: '',
		lng: '',
	});
	const [pictureArray, setPictureArray] = useState([]);

	//here we define our fetch call to make get request from backend for single event of name in url parameters
	const getEvent = async (name) => {
		//name will be formatted to remove dashes on server before mongoDB search
		const event = await fetch(
			`http://localhost:3001/api/events/event/${name}`
		).then(async (result) => {
			const newData = await result.json();
			console.log(newData)
			//here we double check that the event name in the arguement to getEvent and the event returned from the server are the same before setting to state
			if (newData.name === eventName.split('-').join(' ')) {
				handleSetEventState(newData);
			}
			// return newData
		});
	};


	//handler for setting coordinates state.
	const handleSetCoords = (newCoords) => {
		setCoords(newCoords);
	};

	//handler for setting event state.
	const handleSetEventState = (eventState) => {
		setEventState(eventState);
	};


	//get the event data associated with the name in the url, from mongo db, and use it to set local state. 
	useEffect(() => {
		getEvent(eventName);
	}, [eventName]);

	console.log(eventState)
	return (
		<div className='m-5'>
			<EventPageCard
				eventState={eventState}
				coords={coords}
				handleSetCoords={handleSetCoords}
			/>
			<div id='bottom-boundary'></div>
		</div>
	);
};

export default Event;
