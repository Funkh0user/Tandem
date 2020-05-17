const mongoose = require("mongoose");

//mongoDB schema and Event model.

const eventSchema = new mongoose.Schema({
    name: String,
    type: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    address: String,
    city: String,
    state: String,
    postal: String,
    description: String,
    pictures: String,
})

const Event = mongoose.model("Event", eventSchema)


module.exports = Event
