/** @format */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import MainStyle from './components/MainStyle';
import Home from './components/Home';
import SearchEvents from './components/SearchEvents';
import Social from './components/Social';
import Event from './components/Event';
import NavigationState from './components/context/navigationContext/NavigationState';
import ErrorPage from './components/ErrorPage';
import './tailwind.generated.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';
import { latLng } from 'leaflet';

const App = () => {
	//set initial createPromo widget state.
	const [allEvents, setAllEvents] = useState([]);
	const [promoState, setPromoState] = useState({
		name: '',
		type: 'Volunteer Work',
		startDate: '',
		startTime: '',
		startDateTime: '',
		endDate: '',
		endTime: '',
		endDateTime: '',
		latLng: {},
		description: '',
		picturesArr: [],
		files: null,
	});

	const handleSetAllEvents = (arrayOfUrls, eventState) => {
		const myObject = {
			...eventState,
			latLng: JSON.stringify(eventState.latLng), // stringify this latLng object to match behavior of saving event to server as formData() object.
			picturesArr: arrayOfUrls,
		};
		setAllEvents([...allEvents, myObject]);
	};

	//wrapper function for updating controlled form state
	const handlePromoStateChange = (e) => {
		setPromoState({ ...promoState, [e.target.name]: e.target.value });
	};

	//wrapper function to set an iso 8601 / rfc 3339 compliant date-time.
	const handleSetDateTime = () => {
		setPromoState({
			...promoState,
			startDateTime: new Date(
				promoState.startDate + ' ' + promoState.startTime
			).toISOString(),
			endDateTime: new Date(
				promoState.endDate + ' ' + promoState.endTime
			).toISOString(),
		});
	};

	//wrapper function for setting the lat and lng from leaflet maps
	const handleSetLatLng = (coordsObject) => {
		console.log(coordsObject);
		setPromoState({ ...promoState, latLng: coordsObject });
	};

	//wrapper function for handling the react-quill rich-text input, specifically.
	const handleDescriptionChange = (value) =>
		setPromoState({ ...promoState, description: value });

	// this function sets the values of the end date and end time html elements relative to the start date and start time values.
	const handleDefaultEndDateTime = () => {
		let startDateTime = new Date(
			`${promoState.startDate}:${promoState.startTime}`
		);
		let fourHoursFromThen = new Date(
			startDateTime.setTime(startDateTime.getTime() + 3600000 * 4)
		);

		setPromoState({
			...promoState,
			endDate: promoState.startDate,
			endTime: `${
				fourHoursFromThen.getHours() <= 9 ? '0' : ''
			}${fourHoursFromThen.getHours()}:${
				fourHoursFromThen.getMinutes() <= 9 ? '0' : ''
			}${fourHoursFromThen.getMinutes()}`,
		});
	};

	//this function handles saving image files to state.
	const handleFileUpload = (files) => {
		console.log(files);
		setPromoState({ ...promoState, files: files });
	};

	return (
		<div>
			<NavigationState>
				<Router>
					<MainStyle setAllEvents={setAllEvents}>
						<Switch>
							<Route exact path='/'>
								<Home allEvents={allEvents} />
							</Route>
							<Route exact path='/create'>
								<CreateEvent
									promoState={promoState}
									handlePromoStateChange={handlePromoStateChange}
									handleDescriptionChange={handleDescriptionChange}
									handleSetAllEvents={handleSetAllEvents}
									handleSetDateTime={handleSetDateTime}
									handleDefaultEndDateTime={handleDefaultEndDateTime}
									handleSetLatLng={handleSetLatLng}
									handleFileUpload={handleFileUpload}
								/>
							</Route>
							<Route path='/search'>
								<SearchEvents />
							</Route>
							<Route path='/social'>
								<Social />
							</Route>
							<Route
								path='/events/:eventName'
								render={(props) => <Event {...props} latLng={latLng} />}
							/>
							<Route path='/error' component={ErrorPage} />
						</Switch>
					</MainStyle>
				</Router>
			</NavigationState>
		</div>
	);
};

export default App;
