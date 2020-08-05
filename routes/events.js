/** @format */

const express = require('express');
const Events = require('../models/events'); // import mongoDB model (schema)
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
	destination: __dirname + '/media/',
	filename(req, file, cb) {
		console.log(file);
		cb(null, `${file.originalname}-${new Date()}`);
	},
});

const upload = multer({ storage });

//@route    api/events
//@description    POST new event
router.post('/', upload.any('file'), async (req, res) => {
	console.log('heres the path: ', req.files[0].path);
	const image = req.files[0].path
	console.log(req.body);
	//trim whitespace and make the name lowercase so its easier to handle later in the get route
	const lowerCaseName = req.body.name.toLowerCase().trim();
	console.log(lowerCaseName);
	const events = await Events.findOne({ name: lowerCaseName });
	//check mongoDB for an event with the same name. if it exists, exit with 400 error
	if (events) {
		return res.status(400).json({ errorMsg: 'Event already exists.' });
	}
	//save event to mongoDB
	try {
		const newEvent = new Events({
			name: lowerCaseName,
			type: req.body.type,
			description: req.body.description,
			startDate: req.body.startDate,
			startTime: req.body.startTime,
			startDateTime: req.body.startDateTime,
			endDate: req.body.endDate,
			endTime: req.body.endTime,
			endDateTime: req.body.endDateTime,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			postal: req.body.postal,
			latLng: req.body.latLng,
			description: req.body.description,
			pictures: req.body.pictures,
			picturesArr: image,
		});
		newEvent.save();
		res.status(200).json(newEvent);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error.');
	}
});

//@Route  api/events
//@description  GET events to display on mainpage in promo widget / cards.

router.get('/:number', async (req, res) => {
	const numberOfEventsToDisplay = req.params.number;
	//get events from mongoDB
	try {
		const allEvents = await Events.find({});
		if (numberOfEventsToDisplay === 'all') {
			res.status(200).json(allEvents.slice(0, allEvents.length - 1));
		} else {
			res.status(200).json(allEvents.slice(0, numberOfEventsToDisplay));
		}
		// res.status(200).json(allEvents);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error.');
	}
});

//@Route  api/events
//@description  GET a specific event to display on its own individual page.

router.get('/event/:eventName', async (req, res) => {
	//formatt url parameter into usable name name before searching mongo db
	const formattedEventName = req.params.eventName
		.split('-')
		.join(' ')
		.toLowerCase();
	//get events from mongoDB
	try {
		const event = await Events.findOne({ name: formattedEventName });
		console.log('here is the event you searched for: ', event);
		res.status(200).json(event);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error.');
	}
});
module.exports = router;
