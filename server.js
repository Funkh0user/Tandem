require('dotenv').config()
const express = require("express")
const path = require("path")
const app = express()
const connectDB = require("./config/db")
const cors = require("cors")
//run mongoose connection methods, connect to mongoDB
connectDB()

console.log(process.env.node_env)
//enable cross origin resource sharing while in development so frontend / webpack dev server and backend / express server running on different ports can communicate happily.
app.use(cors())

//enable express middleware to parse json and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//spin up server on port 3001
app.listen(3001, ()=> {
    console.log("Listening on port 3001")
})

//events route
app.use("/api/events", require("./routes/events"))

//users route (not currently being used.)
app.use("/api/users", require("./routes/users"))


if(process.env.node_env === "production") {
    app.use(express.static("client/build"))
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

