const express = require("express");
const router = express.Router();
const {handleUserSignUp,handleUserLogIn} = require("../controllers/user")


router
.post ("/",handleUserSignUp)
.post ("/login",handleUserLogIn)

module.exports = router;