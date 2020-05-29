const express = require('express');
const Events = require('../models/events'); // import mongoDB model (schema)
const router = express.Router(); 

//@route    api/events
//@description    POST new event 
router.post('/', async (req, res) => {
  //check mongoDB for an event with the same name. if it exists, exit with 400 error
  console.log(req.body)
  const events = await Events.findOne({ name: req.body.name });
  if (events) {
    return res.status(400).json({ errorMsg: 'Event already exists.' });
  } 
  //save event to mongoDB
  try {
    const newEvent = new Events({
      name: req.body.name,
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
      description: req.body.description,
      pictures: req.body.pictures,
    });
    newEvent.save();
    res.status(200).json(newEvent);
  } catch(error) {
    console.log(error)
    res.status(500).send('Server error.')
  }
});

//@Route  api/events 
//@description  GET events

router.get('/:number', async (req, res) => {
  const numberOfEventsToDisplay = req.params.number
  //get events from mongoDB
  try {
    const allEvents = await Events.find({});
    if(numberOfEventsToDisplay === "all") {
      res.status(200).json(allEvents.slice(0, allEvents.length - 1));
    } else {
      res.status(200).json(allEvents.slice(0, numberOfEventsToDisplay));
    }
    // res.status(200).json(allEvents);
  } catch(error) {
    console.log(error)
    res.status(500).send('Server error.')
  }
});

module.exports = router;
