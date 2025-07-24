const express = require('express');
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require('../middlewares/auth');

router
.get("/", restrictTo(["Normal"]), async (req, res)=>{
    if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render("Home",{
        urls : allUrls,
    })
})

.get("/signup", (req,res) =>{
    return res.render("signup")
})

.get("/login", (req,res) =>{
    return res.render("login")
})
module.exports = router;