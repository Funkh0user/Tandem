/** @format */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventPageCard from './EventPageCard';

//this component, as well as its child eventPageCard, are responsible for displaying data about an event on a distinct page with a unique url.
const Event = (props) => {
	//this grabs the parameter from the url with the name of the event.
	const {
		params: { eventName },
	} = props.match;

	const history = useHistory();
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
		const response = await fetch(
			`/api/events/event/${name}`
		);
		try {
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = response.ok;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();
				throw errorObject;
			}
			const newData = await response.json();
			newData.ok = true;
			if (newData.name === eventName.split('-').join(' ')) {
				handleSetEventState(newData);
				return newData;
			}
		} catch (error) {
			return error;
		}
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
		getEvent(eventName).then((result) => {
			console.log(result);
			if (!result.ok) {
				history.push({
					pathname: '/error',
					state: {
						error: result,
					},
				});
			}
		});
	}, [eventName]);

	console.log(eventState);
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
