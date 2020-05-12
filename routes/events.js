const express = require('express');
const Events = require('../models/events'); // import mongoDB model (schema)
const router = express.Router(); 

//post new event
router.post('/', async (req, res) => {
  const events = await Events.findOne({ name: req.body.name });
  if (events) {
    return res.status(400).json({ msg: 'Event already exists.' });
  } 
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
  } catch (err) {
    console.err(err.msg)
    res.status(500).send('Server error.')
  }
});

router.get('/', async (req, res) => {
  try {
    const allEvents = await Events.find({});
    res.status(200).json(allEvents);
  } catch(err) {
    console.err(err.msg)
    res.status(500).send('Server error.')
  }
});

module.exports = router;
