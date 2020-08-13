const mongoose = require("mongoose");

//mongoDB schema and Event model.

const eventSchema = new mongoose.Schema({
    name: String,
    type: String,
    startDate: String,
    startTime: String,
    startDateTime: String,
    endDate: String,
    endTime: String,
    endDateTime: String,
    latLng: Object,
    description: String,
    pictures: String,
    picturesArr: Array
})

const Event = mongoose.model("Event", eventSchema)


module.exports = Event
