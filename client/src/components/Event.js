import React, { useState, useEffect } from 'react';
import EventPageCard from './EventPageCard'
import EventLocationMap from './EventLocationMap';
import { AiOutlineCalendar } from 'react-icons/ai';
import { RiMapPin2Line } from 'react-icons/ri';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import ImageCarousel from './ImageCarousel';
import spinner from '../assets/spinner.gif';
import { Link } from 'react-router-dom';

const Event = ({ match }) => {
	const {
		params: { eventName },
	} = match;
	//here we need to format match.params.eventName (destructured to eventName) before we use it to search mongoDB
	// const formattedEventName = match.params.eventName.split().............

	const [eventState, setEventState] = useState({});
	const [coords, setCoords] = useState({
		lat: '',
		lng: '',
	});
	// destructure eventState object.
	const {
		name,
		type,
		// startDate,
		// startTime,
		// endDate,
		// endTime,
		address,
		city,
		state,
		postal,
		description,
		// links,
		pictures,
		// picturesArr,
		// files,
		startDateTime,
	} = eventState;


	//here we define our fetch call to the backend.
	const getEvent = async (name) => {
		console.log(name);
		const event = await fetch(
			`http://localhost:3001/api/events/event/${name}` // use eventName here after its been formatted
		).then(async (result) => {
			const newData = await result.json();
			console.log(newData.name);
			console.log(eventName);
			if (newData.name === eventName) {
				console.log('trigger');
				handleSetEventState(newData);
			}
			// return newData
		});
	};

	//defines our api call to opencagedata to convert location address into coordinates for leaflet maps.
	const getCoords = async () => {
		console.log(address, city, state, postal);
		const result = await fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
				address
			)}%20${encodeURIComponent(city)}%20${encodeURIComponent(
				state
			)}%20${encodeURIComponent(postal)}&key=${process.env.REACT_APP_OPEN_CAGE}`
		);
		const newData = await result.json();
		console.log(newData);
		return newData;
	};

	const handleSetCoords = (newCoords) => {
		setCoords(newCoords);
	};

	const handleSetEventState = (eventState) => {
		setEventState(eventState);
	};


	// console.log(pictures);
	// const picturesArr = pictures
	// .replace(/\n/g, ' ')
	// .split(' ')
	// .filter((picture) => picture !== '');

	useEffect(() => {
		//get the event data associated with the url from mongo db and use it to set local
		getEvent(eventName);
	}, [eventName]);

	useEffect(() => {
		console.log(
			eventState.address,
			eventState.city,
			eventState.state,
			eventState.postal
		);
		//use the address information to get coordinates.
		if (eventState.address) {
			getCoords().then((result) => {
				//if there are results, set coordinate state to the results.
				if (result.results[0]) {
					//set some state to these coords, pass into eventLocationMap.
					handleSetCoords(result.results[0].geometry);
				}
			});
		}
	}, [
		eventState.address,
		eventState.city,
		eventState.state,
		eventState.postal,
	]);




	return (
		<div className='m-5'>
			<EventPageCard eventState={eventState} coords={coords} handleSetCoords={handleSetCoords}/>
			<div id='bottom-boundary'></div>
		</div>
	);
};

export default Event;
