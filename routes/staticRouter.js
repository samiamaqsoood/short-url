const express = require('express');
const router = express.Router();

router
.get("/", (req, res)=>{
    return res.render("Home")
})

.get("/signup", (req,res) =>{
    return res.render("signup")
})

.get("/login", (req,res) =>{
    return res.render("login")
})
module.exports = router;