const express = require('express');
const Events = require('../models/events');
const router = express.Router();

//post new event
router.post('/', async (req, res) => {
  const events = await Events.findOne({ name: req.body.name });
  if (events) {
    return res.status(400).json({ msg: 'Event already exists.' });
  } else {
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
    //TO-DO add error handling..try/catch
    newEvent.save();
  }
  res.status(200).json({ msg: 'post request made' });
});

router.get('/', async (req, res) => {
  //TO-DO add error handling try/catch stuff
  const allEvents = await Events.find({});
  res.status(200).json(allEvents);
});

module.exports = router;
