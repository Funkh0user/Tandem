/** @format */

import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationContext from './context/navigationContext/NavigationContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Editor from './Editor';
import LocationSelector from './LocationSelector';
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
	handleSetLatLng,
	handleFileUpload,
}) => {
	const navigationContext = useContext(NavigationContext);
	let history = useHistory();
	const [step, setStep] = useState(0);
	const [entered, setEntered] = useState(true);

	const [fileUploadError, setFileUploadError] = useState(false);
	const handleSetFileUploadError = (value) => {
		setFileUploadError(value);
	};

	const [isExpanded, setIsExpanded] = useState(null);
	const handleSetIsExpanded = () => setIsExpanded(!isExpanded);

	const [showFormAlert, setShowFormAlert] = useState(false);
	//a function to that will alert the user when they have not entered data into an input
	const handleShowFormAlert = () => {
		setShowFormAlert(!showFormAlert);
		setTimeout(() => {
			setShowFormAlert();
		}, 4000);
	};

	//A function that posts event data to the server.
	const saveEvent = async (data) => {
		const response = await fetch('/api/events', {
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			body: data,
		});
		console.log(response);
		try {
			//if there is a problem with posting the event, create an error object and pass it the response data then throw it
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = response.ok;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();
				throw errorObject;
			}
			//otherwise, convert to json, add ok:true property and return
			const newData = await response.json();
			newData.ok = true;
			return newData;
		} catch (error) {
			console.log('there was a problem saving this event.', error);
			return error;
		}
	};

	//A function for keeping track of what section of the event creation form is being rendered...
	const handleSetStep = (e) => {
		//prevent default form behavior.
		e.preventDefault();
		if (e.target.name === 'nextButton') {
			//A series of checks to validate form input has been entered at each step
			if (step === 0 && promoState.name === '') {
				handleShowFormAlert();
			} else if (step === 1 && promoState.type === '') {
				handleShowFormAlert();
			} else if (step === 2) {
				if (
					promoState.latLng.lat === undefined &&
					promoState.latLng.lng === undefined
				) {
					handleShowFormAlert();
				} else {
					//trigger react-transition-group animation
					setEntered(!entered);
					//increment state of step
					step <= 5 && setStep(step + 1);
				}
			} else if (step === 3) {
				if (promoState.startDate === '' || promoState.startTime === '') {
					handleShowFormAlert();
				} else {
					// this function sets the values of the end date and end time html elements relative to the start date and start time values.
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
			//if the user is pressing the back button, trigger react animation group and decrement state of step.
			setEntered(!entered);
			step >= 0 && setStep(step - 1);
		}
	};

	//A function for saving an image(s) file to state
	const validateFiles = async (e) => {
		let fileUpload;
		if (e.target) {
			//if the file(s) are to big or there are to many, trigger error message
			//TODO disable submit button if files are invalid, or do this validation in handleSubmit and return if invalid.
			for (let i = 0; i < e.target.files.length; i++) {
				if (e.target.files[i].size > 1000000 || e.target.files.length > 4)
					handleSetFileUploadError(true);
			}
			fileUpload = e.target.files;
			handleFileUpload(fileUpload);
		}
	};

	const handleSubmit = (e) => {
		//prevent default form behavior.
		e.preventDefault();
		// prepare FormData() object to send multipart form data with text fields and picture files to backend.
		let keyValuePairs = Object.entries(promoState);
		const formDataObject = new FormData();
		for (let pair of keyValuePairs) {
			formDataObject.append(pair[0], pair[1]);
		}
		//overwrite latlng field with properly encoded (stringified) JSON object (multipart form data cannot accept complex data types)
		formDataObject.set('latLng', JSON.stringify(promoState.latLng));
		//FileList object has no forEach method, so doing it manually...append each file to our formDataObject object...(formData() )
		for (let i = 0; i < promoState.files.length; i++) {
			if (promoState.files[i].size > 1000000)
				return handleSetFileUploadError(true);
			formDataObject.append('file', promoState.files[i]);
		}
		//Send event to server.
		saveEvent(formDataObject).then((result) => {
			//if there is an error, redirect to error route and render info about the error.
			if (!result.ok) {
				history.push({
					pathname: '/error',
					state: {
						error: result,
					},
				});
			} else {
				//otherwise, render the event to the hompage and reroute there.
				handleSetAllEvents(result.imageUrls, promoState);
				history.push('/');
				//TODO make sure promoState is cleared
			}
		});
	};

	//anytime the window location changes, update the theme, via context.
	useEffect(() => {
		navigationContext.changeTheme();
	}, [navigationContext.location]);

	//widget is either open or closed based on state variable isExpanded.
	//return corresponding jsx
	if (!isExpanded) {
		return (
			<div className='create-promo closed' data-cy='closed'>
				<div className='w-full h-48 bg-green-400'>
					<h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
				</div>
				<div className='w-10/12 lg:w-8/12 rounded-md mt-5 mx-auto bg-green-400 shadow-lg'>
					<h2 className='text-center text-3xl p-5 text-white'>
						<p>Create Event</p>
						<button
							data-cy='toggle-open'
							className='text-2xl'
							onClick={handleSetIsExpanded}>
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
							<p>Create Event</p>
							<button className='text-2xl' onClick={handleSetIsExpanded}>
								<GoChevronUp className='text-white' />
							</button>
						</h2>
					</div>

					<div className='bg-white'>
						<div className='w-full flex justify-center align-center'>
							<form className='w-3/4' onSubmit={handleSubmit}>
								<div>
									<div className='w-full flex flex-col justify-center align-center'>
										{/* these components are from react-transition-group, they handle animation of the form inputs when the mount and unmount. */}
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
												{/* this componenet takes an anonymous function as a child. the functions responsibility is to return the elements that will be animated when they enter or leave the dom */}
												{() => {
													return (
														<div>
															{showFormAlert && (
																<div className='text-center text-red-600 justify-center align-center p-5 bg-white'>
																	Please enter a value
																</div>
															)}
															{/* an IIFE is needed here to correctly return the switch statement containing the different form elements transition in and out of the dom. */}
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
																					className='text-xs'></label>
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
																					className='m-5 border border-solid bg-transparent leading-loose'>
																					<option
																						name='volunteer work'
																						value='volunteer work'
																						onChange={handlePromoStateChange}
																						selected>
																						Volunteer work
																					</option>
																					<option
																						name='music event'
																						value='music event'
																						onChange={handlePromoStateChange}>
																						Music Event
																					</option>
																				</select>
																			</div>
																		);
																	case 2:
																		return (
																			<div className='w-full h-full flex flex-col justify-center align-center'>
																				<LocationSelector
																					handleSetLatLng={handleSetLatLng}
																				/>
																				<p className='p-16 text-center'>
																					Where will this event take place?
																				</p>
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
																					htmlFor='startDate'>
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
																					htmlFor='startTime'>
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
																					htmlFor='endDate'>
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
																					htmlFor='endTime'>
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
																				{fileUploadError && (
																					<div>
																						Theres a problem with your Image(s).
																						Please try again.
																					</div>
																				)}
																				<label htmlFor='file'>
																					Uplaod Images
																				</label>
																				<input
																					id='file'
																					name='file'
																					type='file'
																					accept='.jpg, .jpeg, .png, .svg'
																					onChange={validateFiles}
																					multiple></input>
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
												onClick={handleSetStep}>
												back
											</button>
										)}

										{step === 6 ? (
											<button
												type='submit'
												className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
												onClick={handleSetDateTime}>
												Submit
											</button>
										) : (
											<button
												className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
												name='nextButton'
												onClick={handleSetStep}>
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
