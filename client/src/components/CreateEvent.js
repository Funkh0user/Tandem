import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationContext from './context/navigationContext/NavigationContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Editor from './Editor';
import Test from './Test'
import { GoChevronDown } from 'react-icons/go';
import { GoChevronUp } from 'react-icons/go';

//A widget for creating new events
const CreateEvent = ({
	promoState,
	handlePromoStateChange,
	handleDescriptionChange,
	handleSetAllEvents,
	handleSetDateTime,
	handleDefaultEndDateTime,
	handleSetLatLng
}) => {
	const navigationContext = useContext(NavigationContext);
	let history = useHistory();
	const [expanded, setExpanded] = useState(null);
	const [step, setStep] = useState(0);
	const [entered, setEntered] = useState(true);
	const [showFormAlert, setShowFormAlert] = useState(false);
	const showForms = () => setExpanded(!expanded);
	const handleShowFormAlert = () => {
		// setEntered(!entered);
		setShowFormAlert(!showFormAlert);
		setTimeout(() => {
			setShowFormAlert();
		}, 4000);
	};

	//posts data to server / mongoDB
	const saveEvent = async (data) => {
		const result = await fetch('http://localhost:3001/api/events', {
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		try {
			const newData = await result.json();
			return newData;
		} catch (error) {
			console.log('there was a problem saving this event.', error);
		}
	};
	//A function for keeping track of what section of the event creation form should be rendered..
	const handleSetStep = (e) => {
		//prevent default form behavior.
		e.preventDefault();
		if (e.target.name === 'nextButton') {
			if (step === 0 && promoState.name === '') {
				handleShowFormAlert();
			} else if (step === 1 && promoState.type === '') {
				handleShowFormAlert();
			} else if (step === 2) {
				if (
					promoState.latLng.lat === undefined && promoState.latLng.lng === undefined 
				// 	promoState.address === '' ||
				// 	!promoState.city === '' ||
				// 	!promoState.state === '' ||
				// 	promoState.postal === ''
				) {
					handleShowFormAlert();
				} else {
					setEntered(!entered);
					step <= 5 && setStep(step + 1);
				}
			} else if (step === 3) {
				if (promoState.startDate === '' || promoState.startTime === '') {
					handleShowFormAlert();
				} else {
					handleDefaultEndDateTime();
					setEntered(!entered);
					step <= 5 && setStep(step + 1);
				}
			} else if (step === 4) {
				if (promoState.endDate === '' || promoState.endTime === '') {
					handleShowFormAlert();
				} else {
					setEntered(!entered);
					step <= 5 && setStep(step + 1);
				}
			} else {
				setEntered(!entered);
				step <= 5 && setStep(step + 1);
			}
		} else if (e.target.name === 'backButton') {
			setEntered(!entered);
			step >= 0 && setStep(step - 1);
		}
	};

	const handleClick = () => {
		// handleSetPicturesArray()///// TODO why does one or the other fire but not both?
		handleSetDateTime(); //// TODO why does one or the other fire but not both?
	};

	const handleSubmit = (e) => {
		//prevent default form behavior.
		e.preventDefault();
		//update mongoDB with new event.
		try {
			saveEvent(promoState).then((result) => {
				//update react state with new event if there is no duplicate event error.
				if (!result.errorMsg) {
					handleSetAllEvents(result);
					//redirect to homepage
					history.push('/');
					//if theres an error, log it.
				} else {
					console.log('there was an error', result.errorMsg);
					return null;
				}
			});
			//if there is a mongoDB error, log it.
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		navigationContext.changeTheme();
	}, [navigationContext.location]);

	//widget is either open or closed based on state variable expanded.
	//return corresponding jsx
	if (!expanded) {
		return (
			<div className='create-promo closed' data-cy='closed'>
				<div className='w-full h-48 bg-green-400'>
					<h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
				</div>
				<div className='w-10/12 md:w-10/12 lg:w-8/12 rounded-md mt-5 mx-auto bg-green-400 shadow-lg'>
					<h2 className='text-center text-3xl p-5 text-white'>
						<p>Create Promo</p>
						<button
							data-cy='toggle-open'
							className='text-2xl'
							onClick={showForms}
						>
							<GoChevronDown style={{ color: 'white' }} />
						</button>
					</h2>
				</div>
				<div id='bottom-boundary'></div>
			</div>
		);
	} else {
		return (
			<div className='w-full h-full'>
				<div className='w-full h-48 bg-green-400'>
					<h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
				</div>
				<div className=' w-10/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 shadow-lg'>
					<div className='w-full rounded-t-md text-center bg-green-400'>
						<h2 className='text-center text-3xl p-5 text-white'>
							<p>Create Promo</p>
							<button className='text-2xl' onClick={showForms}>
								<GoChevronUp className='text-white' />
							</button>
						</h2>
					</div>

					<div className='bg-white'>
						<div className='w-full flex justify-center align-center'>
							<form className='w-3/4' onSubmit={handleSubmit}>
								<div>
									<div className='w-full flex flex-col justify-center align-center'>
										{/* these components are from react-transition-group, they handle animation of the form inputs. */}
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
												unmountOnExit
											>
												{/* this componenet takes an anonymous function as a child. the functions responsibility is to return the elements that will be animated when the enter or leave the dom */}
												{() => {
													return (
														<div>
															{showFormAlert && (
																<div className='text-center text-red-600 justify-center align-center p-5 bg-white'>
																	Please enter a value
																</div>
															)}
															{/* an iife is needed here to correctly return the switch statement containing the different form elements transition in and out of the dom. */}
															{(() => {
																switch (step) {
																	case 0:
																		return (
																			<div className=' w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					What would you like to call your new
																					event?
																				</p>
																				<label
																					htmlFor='name'
																					className='text-xs'
																				></label>
																				<input
																					type='text'
																					id='name'
																					name='name'
																					className=' border-b-2'
																					value={promoState.name}
																					onChange={handlePromoStateChange}
																					placeholder='event name...'
																				/>
																			</div>
																		);
																	case 1:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					What kind of event will this be?
																				</p>
																				<label className='p-2' htmlFor='type'>
																					Event Type:
																				</label>
																				<select
																					id='type'
																					name='type'
																					value={promoState.type}
																					onChange={handlePromoStateChange}
																					className='m-5 border border-solid bg-transparent leading-loose'
																				>
																					<option
																						name='music event'
																						value='music event'
																						onChange={handlePromoStateChange}
																						selected
																					>
																						Music Event
																					</option>
																					<option
																						name='volunteer work'
																						value='volunteer work'
																						onChange={handlePromoStateChange}
																					>
																						Volunteer work
																					</option>
																				</select>
																			</div>
																		);
																	case 2:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																			<Test handleSetLatLng={handleSetLatLng} />
																			<p className='p-16 text-center'>
																					Where will this event take place?
																				</p>
																				{/* <p className='p-16 text-center'>
																					Where will this event take place?
																				</p>
																				<label
																					className='p-2'
																					htmlFor='address'
																				>
																					Street Address:
																				</label>
																				<input
																					type='text'
																					name='address'
																					value={promoState.address}
																					onChange={handlePromoStateChange}
																					className=' border border-solid bg-transparent leading-loose'
																				/>
																				<label className='p-2' htmlFor='city'>
																					City:
																				</label>
																				<input
																					type='text'
																					name='city'
																					value={promoState.city}
																					onChange={handlePromoStateChange}
																					className=' border border-solid bg-transparent leading-loose'
																				/>
																				<label className='p-2' htmlFor='state'>
																					State:
																				</label>
																				<input
																					type='text'
																					name='state'
																					value={promoState.state}
																					onChange={handlePromoStateChange}
																					className=' border border-solid bg-transparent leading-loose'
																				/>
																				<label className='p-2' htmlFor='postal'>
																					Postal Code:
																				</label>
																				<input
																					type='text'
																					name='postal'
																					value={promoState.postal}
																					onChange={handlePromoStateChange}
																					className=' border border-solid bg-transparent leading-loose'
																				/> */}
																			</div>
																		);
																	case 3:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					When will this event happen?
																				</p>
																				<label
																					className='p-2'
																					htmlFor='startDate'
																				>
																					Start Date:
																				</label>
																				<input
																					type='date'
																					name='startDate'
																					value={promoState.startDate}
																					onChange={handlePromoStateChange}
																					className='m-5 border border-solid bg-transparent leading-loose'
																				/>
																				<label
																					className='p-2'
																					htmlFor='startTime'
																				>
																					Start Time:
																				</label>
																				<input
																					type='time'
																					name='startTime'
																					value={promoState.startTime}
																					onChange={handlePromoStateChange}
																					className='m-5 border border-solid bg-transparent leading-loose'
																				/>
																			</div>
																		);
																	case 4:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					When will the event end?
																				</p>
																				<label
																					className='p-2'
																					htmlFor='endDate'
																				>
																					End Date:
																				</label>
																				<input
																					id='endDate'
																					type='date'
																					name='endDate'
																					value={promoState.endDate}
																					onChange={handlePromoStateChange}
																					className='m-5 border border-solid bg-transparent leading-loose'
																				/>
																				<label
																					className='p-2'
																					htmlFor='endTime'
																				>
																					End Time:
																				</label>
																				<input
																					id='endTime'
																					type='time'
																					name='endTime'
																					value={promoState.endTime}
																					onChange={handlePromoStateChange}
																					className='m-5 border border-solid bg-transparent leading-loose'
																				/>
																			</div>
																		);
																	case 5:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					Describe your event.
																				</p>
																				<Editor
																					handleDescriptionChange={
																						handleDescriptionChange
																					}
																					placeholder='Tell people about your event...'
																				/>
																			</div>
																		);
																	case 6:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<p className='p-16 text-center'>
																					Links to Images of your event.
																				</p>
																				<label
																					htmlFor='pictures'
																					className='text-xs'
																				>
																					Image URLs:
																				</label>
																				<textarea
																					name='pictures'
																					id='pictures'
																					cols='10'
																					rows='10'
																					value={promoState.pictures}
																					onChange={handlePromoStateChange}
																					className='border border-solid w-full'
																					placeholder="Add as many URLs as you'd like, each on a new line."
																				></textarea>
																			</div>
																		);
																	default:
																		return <div>Test</div>;
																}
															})()}
														</div>
													);
												}}
											</CSSTransition>
										</SwitchTransition>
									</div>

									<div className='w-full flex  justify-center align-center'>
										{step > 0 && (
											<button
												className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
												name='backButton'
												onClick={handleSetStep}
											>
												back
											</button>
										)}

										{step === 6 ? (
											<button
												type='submit'
												className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
												onClick={handleClick}
											>
												Submit
											</button>
										) : (
											<button
												className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
												name='nextButton'
												onClick={handleSetStep}
											>
												Next
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div id='bottom-boundary'></div>
			</div>
		);
	}
};

export default CreateEvent;
