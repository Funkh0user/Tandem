const express = require('express');
const Events = require('../models/events'); // import mongoDB model (schema)
const router = express.Router(); 

//@route    api/events
//@description    POST new event 
router.post('/', async (req, res) => {
  //check mongoDB for an event with the same name. if it exists, exit with 400 error
  const events = await Events.findOne({ name: req.body.name });
  if (events) {
    return res.status(400).json({ msg: 'Event already exists.' });
  } 
  //save event to mongoDB
  try {
    const newEvent = new Events({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      location: req.body.location,
      description: req.body.description,
      pictures: req.body.pictures,
    });
    newEvent.save();
    res.status(200).json(newEvent);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error.')
  }
});

//@Route  api/events 
//@description  GET all events

router.get('/', async (req, res) => {
  //get all events from mongoDB
  try {
    const allEvents = await Events.find({});
    res.status(200).json(allEvents);
  } catch(error) {
    console.error(error.message)
    res.status(500).send('Server error.')
  }
});

module.exports = router;
