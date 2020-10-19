const mongoose = require("mongoose");

//mongoDB schema and Event model.

const eventSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    picturesArr: Array,
    startDate: String,
    startTime: String,
    startDateTime: String,
    endDate: String,
    endTime: String,
    endDateTime: String,
    latLng: Object,
    
})

const Event = mongoose.model("Event", eventSchema)


module.exports = Event
