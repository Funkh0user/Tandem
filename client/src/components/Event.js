import React, { useState, useEffect } from 'react';
// import EventLocationMap from '../EventLocationMap';
import { AiOutlineCalendar } from 'react-icons/ai';
import { RiMapPin2Line } from 'react-icons/ri';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
// import ImageCarousel from '../ImageCarousel';

const Event = ({ match }) => {
	const {
		params: { eventName },
	} = match;

	const [eventState, setEventState] = useState({});

	//destructure eventState prop
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
	//here we need to format match.params.eventName (destructured to eventName) before we use it to search mongoDB
	// const formattedEventName = match.params.eventName.split().............

	//here we define our fetch call to the backend.
	const getEvents = async () => {
		const event = await fetch(
			`http://localhost:3001/api/events/event/${eventName}` // use eventName here after its been formatted
		).then(async (result) => setEventState(await result.json()));
	};

	useEffect(() => {
		//once the component is mounted, call getEvents() once.
		getEvents();
	}, []);

	console.log(match.params);
	console.log(eventState);
	return (
		<div>
			<p>{match.params.eventName}</p>
			<p>{eventState.name}</p>
			<div
				className='break-words m-2 p-2 text-center'
				dangerouslySetInnerHTML={{ __html: description }}
			></div>{' '}
			<div id='bottom-boundary'></div>
		</div>
	);
};

export default Event;
