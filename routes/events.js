/** @format */

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const Events = require('../models/events'); // import mongoDB model (schema)
const router = express.Router();
const multer = require('multer');
const aws = require('aws-sdk');

//initialize amazon s3 storage api
const s3 = new aws.S3({
	accessKeyId: process.env.AWS_S3_BUCKET_ID,
	secretAccessKey: process.env.AWS_S3_BUCKET_SECRET,
});

//a function which takes an image file path, and the name the image will be saved as, and saves the image to aws
const uploadSingleImage = async (imagePath, nameToApply) => {
	//use the filesystem api provided by node to prepare the image to be uploaded.
	const imageData = fs.readFileSync(imagePath);
	const params = {
		Bucket: 'tand3m',
		Key: nameToApply,
		Body: imageData,
		ContentType: 'image/jpg',
		ACL: 'public-read',
	};
	//s3.upload returns asyncronously and must be wrapped in a promise
	const imageUploadPromise = new Promise((resolve, reject) => {
		s3.upload(params, (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	return imageUploadPromise;
};

//multer configuration for local disk storage
// const storage = multer.memoryStorage()
const storage = multer.diskStorage({
	destination: __dirname + '/media/',
	filename(req, file, cb) {
		cb(null, `${file.originalname}-${new Date()}`);
	},
});

//initiate multer middleware for handling enctype: multipart-form
//TODO limit upload size to 1 mb each image.
//TODO improve error message / validation for number of pictures and size of pictures
const upload = multer({
	storage: storage,
	limits: {
		filesize: 1028 * 1028,
	},
});

//@route    api/events
//@description    POST new event
router.post('/', upload.array('file', 4), async (req, res, next) => {
	console.log('here are the files you sent to the server', req.files);
	//get the files paths on the server which we saved via multer from the post request.
	const imagePaths = req.files;
	//trim whitespace from eventName and make the name lowercase so its easier to handle later in the get route
	const lowerCaseName = req.body.name.toLowerCase().trim();

	// an array of promises, containing our image urls, created by mapping through the files in the post request and sending to s3.
	const uploadedImageData = imagePaths.map(async (image, index) => {
		console.log('heres the image were mapping', image);
		const imageLocationOnS3 = await uploadSingleImage(
			image.path,
			lowerCaseName + index
		);
		console.log('imageURL', imageLocationOnS3);
		return imageLocationOnS3.Location;
	});

	//Handle our array of promises returned from S3 with Promise.All and save event to mongoDB in the callback.
	Promise.all(uploadedImageData).then(async (imageUrls) => {
		console.log('heres the result of promise.all', imageUrls);

		//check mongoDB for an event with the same name. if it exists, exit with 400 error
		const events = await Events.findOne({ name: lowerCaseName });
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
				latLng: req.body.latLng,
				description: req.body.description,
				picturesArr: imageUrls,
			});
			newEvent.save();
			res.status(200).json(newEvent);
		} catch (error) {
			console.log(error);
			res.status(500).send('Server error.');
		}
	});
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
