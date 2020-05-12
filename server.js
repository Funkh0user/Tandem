const express = require("express")
const path = require("path")
const app = express()
const connectDB = require("./config/db")
const cors = require("cors")
connectDB()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}))


app.listen(3001, ()=> {
    console.log("Listening on port 3001")
})


app.use("/api/events", require("./routes/events"))
app.use("/api/users", require("./routes/users"))



// if(process.env.node_env === "production") {
//     app.use(express.static("client/build"))
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     })
// }

