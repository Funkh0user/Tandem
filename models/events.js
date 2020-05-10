const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: String,
    type: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    location: String,
    description: String,
    pictures: String,
})

const Event = mongoose.model("Event", eventSchema)


module.exports = Event
