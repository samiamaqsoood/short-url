const express = require('express');
const {handleGetShortURL,handleGetAnalytics} = require("../controllers/url")
const router = express.Router();


router
.post("/",handleGetShortURL)
.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;