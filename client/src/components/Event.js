import React, { useState, useEffect } from 'react';
import EventPageCard from './EventPageCard'

//this component, as well as its child eventPageCard, are responsible for displaying data about an event on a seperate page with a unique url.
const Event = ({ match }) => {
	//this grabs the parameter from the url with the name of the event.
	const {
		params: { eventName },
	} = match;

	//here we need to format match.params.eventName (destructured to eventName) before we use it to search mongoDB
	// const formattedEventName = match.params.eventName.split().............

	//create some state to hold data about the event the user is viewing
	const [eventState, setEventState] = useState({});
	const [coords, setCoords] = useState({
		lat: '',
		lng: '',
	});
	const [pictureArray, setPictureArray] = useState([])

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
		const event = await fetch(
			`http://localhost:3001/api/events/event/${name}` // TODO format the event name to replace spaces with dashes (camel case)
		).then(async (result) => {
			const newData = await result.json();
			if (newData.name === eventName) {
				handleSetEventState(newData);
			}
			// return newData
		});
	};

	//defines our api call to opencagedata to convert location address into coordinates for leaflet maps.
	const getCoords = async () => {
		const result = await fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
				address
			)}%20${encodeURIComponent(city)}%20${encodeURIComponent(
				state
			)}%20${encodeURIComponent(postal)}&key=${process.env.REACT_APP_OPEN_CAGE}`
		);
		const newData = await result.json();
		return newData;
	};

	//handler for setting coordinates state.
	const handleSetCoords = (newCoords) => {
		setCoords(newCoords);
	};

	//handler for setting event state.
	const handleSetEventState = (eventState) => {
		setEventState(eventState);
	};

	//create a variable to hold the new array generated by parsing through the pictures string.
	let formattedPictureArray;
	if(pictures) {
		formattedPictureArray = pictures
		.replace(/\n/g, ' ')
		.split(' ')
		.filter((picture) => picture !== '');
	}

	
	useEffect(() => {
		//get the event data associated with the url from mongo db and use it to set local
		getEvent(eventName);
	}, [eventName]);

	useEffect(() => {
		//set pictureArr created above to state.
		setPictureArray(formattedPictureArray)

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
			<EventPageCard eventState={eventState} coords={coords} test={'this is a test'} handleSetCoords={handleSetCoords} pictureArray={pictureArray}/>
			<div id='bottom-boundary'></div>
		</div>
	);
	
};

export default Event;
