import React, { useState, useEffect } from 'react';
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
	const [isExpanded, setIsExpanded] = useState(false);
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

	const formattedTime = new Date(eventState.startDateTime).toLocaleDateString();

	//here we define our fetch call to the backend.
	const getEvent = async (eventName) => {
		console.log(eventName);
		const event = await fetch(
			`http://localhost:3001/api/events/event/${eventName}` // use eventName here after its been formatted
		).then(async (result) => {
			const newData = await result.json();
			// console.log(newData)
			handleSetEventState(newData);
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

	const expand = () => setIsExpanded(!isExpanded);

	// console.log(pictures);
	// const picturesArr = pictures
	// .replace(/\n/g, ' ')
	// .split(' ')
	// .filter((picture) => picture !== '');

	useEffect(() => {
		//get the event from mongo db and set local state using event data
		getEvent(eventName);
		//use the address information to get coordinates.
		getCoords().then((result) => {
			//if there are results, set coordinate state to the results.
			if (result.results[0]) {
				//set some state to these coords, pass into eventLocationMap.
				handleSetCoords(result.results[0].geometry);
			}
		});
	}, [eventName, address, city, state, postal]);

	return (
		<div className='m-5'>
			<div className='flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
				<h1 className='rounded-t bg-blue-400 text-center text-white text-3xl break-words'>
					<p>{eventState.name}</p>
					<button className='p-2' onClick={expand}>
						{isExpanded ? <GoChevronUp /> : <GoChevronDown />}
					</button>
				</h1>
				<div className='flex items-center justify-center'>
					{/* <ImageCarousel picturesArr={picturesArr} />  */}
					{coords.lng && coords.lat && address && city && state && postal !== undefined ? (
						<EventLocationMap coords={coords} />
					) : (
						<img src={spinner} />
					)}
				</div>
				<span className='text-xs text-white p-2 bg-blue-400 rounded'>
					{eventState.type}
				</span>
				<div className='flex justify-around items-center text-center'>
					<div className='p-2 flex flex-col items-center'>
						<AiOutlineCalendar className='text-4xl text-blue-400' />
						<p className='text-sm font-hairline text-opacity-50 '>
							{formattedTime}
						</p>
					</div>
					<div className='p-1'></div>
					<div className='p-2 flex flex-col items-center'>
						<RiMapPin2Line className='text-4xl text-blue-400' />
						<p className='text-sm font-hairline text-opacity-50'>
							{eventState.address}
						</p>
					</div>
				</div>
				<div
					className='break-words m-2 p-2 text-center'
					dangerouslySetInnerHTML={{ __html: eventState.description }}
				></div>
				<Link to={`/`}>Go Back</Link>
				<button
					className='p-2 text-center text-4xl text-blue-400'
					onClick={expand}
				>
					{isExpanded ? <GoChevronUp /> : <GoChevronDown />}
				</button>
			</div>
			<div id='bottom-boundary'></div>
		</div>
	);
};

export default Event;
