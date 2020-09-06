/** @format */

import React from 'react';
import EventLocationMap from './EventLocationMap';
import { AiOutlineCalendar } from 'react-icons/ai';
import { RiMapPin2Line } from 'react-icons/ri';
import ImageCarousel from './ImageCarousel';
import spinner from '../assets/spinner.gif';
import { Link } from 'react-router-dom';

//child component to Event.js
const EventPageCard = ({ eventState}) => {
	//destructure event state.
	const { startDateTime, name, type, description, picturesArr} = eventState;
	//instantiate a new Date object, and format it to be more human readable.
	const formattedTime = new Date(startDateTime).toLocaleDateString();
	console.log(picturesArr)
	return (
		<div className='flex-col'>
			<h1 className='rounded-t bg-blue-400 text-center text-white text-3xl break-words'>
				<p>
					{name &&
						name
							.split(' ')
							.map((word) => word[0].toUpperCase() + word.slice(1))
							.join(' ')}
				</p>
			</h1>
			<div className='flex p-5 rounded bg-white shadow-lg text-center'>
				<div className='flex-col flex-1 justify-center items-center px-5'>
					{picturesArr !== '' && <ImageCarousel pictureArray={picturesArr} />}
					<div className='flex justify-around items-center text-center'>
						<div className='p-2 flex flex-col items-center'>
							<AiOutlineCalendar className='text-4xl text-blue-400' />
							<p className='text-sm font-hairline text-opacity-50 '>
								{formattedTime}
							</p>
						</div>
						<div className='p-2 flex flex-col items-center'>
							<RiMapPin2Line className='text-4xl text-blue-400' />
							<p className='text-sm font-hairline text-opacity-50'></p>
						</div>
					</div>
					<div
						className='break-words m-2 p-2 text-center'
						dangerouslySetInnerHTML={{ __html: description }}></div>
					<div className='bg-white text-center'>
						<button className='p-2 text-center text-4xl text-blue-400'>
							<Link to={`/`}>back</Link>
						</button>
					</div>
				</div>
				{eventState.latLng ? (
					<div className='flex-1'>
						<EventLocationMap coords={JSON.parse(eventState.latLng)} />
					</div>
				) : (
					<div>
						<img src={spinner} />
					</div>
				)}
			</div>
		</div>
	);
};
export default EventPageCard;
