const express = require("express")

const router = express.Router()


//users route (not currently in use)
router.get("/", (req, res) => {
    res.send("users route")
})

module.exports = router