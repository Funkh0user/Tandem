
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import EventLocationMap from './EventLocationMap';
import { AiOutlineCalendar } from 'react-icons/ai';
import { RiMapPin2Line } from 'react-icons/ri';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import ImageCarousel from './ImageCarousel';
import spinner from '../assets/spinner.gif';

//component for displaying small amount of data from many events on one page.
const EventCard = ({ promoState }) => {
	//destructure data from promoState prop
	const {
		name,
		type,
		address,
		description,
		pictures,
		startDateTime,
		latLng,
	} = promoState;

	//format the name of the event with dashes instead of spaces, and
	const formattedName = name
		.split(' ')
		.filter((char) => char != '')
		.join('-')
		.toLowerCase();

	//local state variable controls if card is expanded or not
	const [isExpanded, setIsExpanded] = useState(false);

	// state variable for setting location in leaflet maps.
	const [coords, setCoords] = useState({
		lat: '',
		lng: '',
	});

	//state variable for triggering react-transition-group
	const [entered, setEntered] = useState(true);

	//instantiate a date object and format to be human readable.
	const formattedTime = new Date(startDateTime).toLocaleDateString();

	//handle function to expand promo card
	const expand = () => {
		setEntered(!entered);
		setIsExpanded(!isExpanded);
	};

	// creates an array of image urls by parsing the state variable, pictures, which is saved as a string.
	const pictureArray = pictures
		.replace(/\n/g, ' ')
		.split(' ')
		.filter((picture) => picture !== '');

	//handler function for setting coordinates
	const handleSetCoords = (newCoords) => {
		setCoords(newCoords);
	};

	return (
		<div>
			{/* react-transition-group wrapper components */}
			<SwitchTransition mode={'out-in'}>
				<CSSTransition
					key={entered}
					addEndListener={(node, done) => {
						node.addEventListener('transitionend', done, false);
					}}
					classNames='fade'
					timeout={{
						appear: 500,
						enter: 900,
						exit: 900,
					}}
					appear
					unmountOnExit>
					{/* react-transition-group components take a annonymous function as a child. function returns the elements that the animations will apply to */}
					{() => {
						return (
							<div>
								{/* switch statement returning jsx, needs to be wrapped in IIFE */}
								{(() => {
									switch (isExpanded) {
										case false:
											return (
												<div className='p-5'>
													<div className=' flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
														<h1 className='rounded-t justify-center bg-blue-400 text-center text-white text-2xl break-words'>
															<p>
																{name &&
																	name
																		.split(' ')
																		.map(
																			(word) =>
																				word[0].toUpperCase() + word.slice(1)
																		)
																		.join(' ')}
															</p>
														</h1>
														<img
															src={pictureArray[0]}
															className='w-8/12 mx-auto m-2'
														/>
														<span className='text-xs text-white p-2 bg-blue-400 rounded'>
															{type}
														</span>
														<div className='flex justify-center'>
															<div className='p-5'>
																<AiOutlineCalendar className='text-4xl mx-auto text-blue-400' />
																<p className='text-xs font-hairline text-opacity-50'>
																	{formattedTime}
																</p>
															</div>
															<div className='p-5'>
																<RiMapPin2Line className='text-4xl mx-auto text-blue-400' />
																<p className='text-xs font-hairline text-opacity-50 '>
																	{address}
																</p>
															</div>
														</div>
														<div
															className='break-words text-sm m-1 p-1'
															dangerouslySetInnerHTML={{
																__html: description.substring(0, 50) + '...',
															}}></div>
														<button
															className='p-1 text-4xl text-blue-400'
															onClick={expand}>
															{isExpanded ? <GoChevronUp /> : <GoChevronDown />}
														</button>
													</div>
												</div>
											);
										case true:
											return (
												<div className='m-5'>
													<div className='flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
														<h1 className='rounded-t bg-blue-400 text-center text-white text-3xl break-words'>
															<p>
																{name &&
																	name
																		.split(' ')
																		.map(
																			(word) =>
																				word[0].toUpperCase() + word.slice(1)
																		)
																		.join(' ')}
															</p>
															<button className='p-2' onClick={expand}>
																{isExpanded ? (
																	<GoChevronUp />
																) : (
																	<GoChevronDown />
																)}
															</button>
														</h1>
														<div className='mx-auto'>
															<ImageCarousel pictureArray={pictureArray} />
															{/* parse stringified object latLng and validate before rendering leaflet map */}
															{JSON.parse(latLng).lng && JSON.parse(latLng).lat !== '' ? (
																<EventLocationMap coords={JSON.parse(latLng)} />
															) : (
																<img src={spinner} />
															)}
														</div>
														<span className='text-xs text-white p-2 bg-blue-400 rounded'>
															{type}
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
																	{address}
																</p>
															</div>
														</div>

														<div
															className='break-words m-2 p-2 text-center'
															dangerouslySetInnerHTML={{
																__html: description,
															}}></div>
														<Link to={`/events/${formattedName}`}>
															<p className='text-blue-600'>Go to event page</p>
														</Link>
													</div>
												</div>
											);
										default:
											return (
												<div>
													<p>Default case</p>
												</div>
											);
									}
								})()}
							</div>
						);
					}}
				</CSSTransition>
			</SwitchTransition>
		</div>
	);
};

export default EventCard;
