	//child component to Event.js
    import React, { useState, useEffect } from 'react';
    import EventLocationMap from './EventLocationMap';
    import { AiOutlineCalendar } from 'react-icons/ai';
    import { RiMapPin2Line } from 'react-icons/ri';
    import { GoChevronDown, GoChevronUp } from 'react-icons/go';
    import ImageCarousel from './ImageCarousel';
    import spinner from '../assets/spinner.gif';
    import { Link } from 'react-router-dom';
	const EventPageCard = (props) => {
        const {eventState} = props;
    	const formattedTime = new Date(eventState.startDateTime).toLocaleDateString();

		console.log(eventState);
		return (
			<div>
				<div className='flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
					<h1 className='rounded-t bg-blue-400 text-center text-white text-3xl break-words'>
						<p>{eventState.name}</p>
						<button className='p-2'>
						</button>
					</h1>
					<div className='flex items-center justify-center'>
						{/* <ImageCarousel picturesArr={picturesArr} />  */}
						{props.coords.lng && props.coords.lat !== '' ? (
							<EventLocationMap coords={props.coords} />
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
						
					>
					</button>
					<div id='bottom-boundary'></div>
				</div>
			</div>
		);
    };
    export default EventPageCard