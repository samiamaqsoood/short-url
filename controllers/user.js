const User = require("../models/user")
const {v4 : uuidv4} = require("uuid");

async function handleUserSignUp(req,res) {
    const {name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })

    res.redirect("/")
}

async function handleUserLogIn(req,res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if(!user)
        return res.render("login", {
    error: "Wrong username or password."})

    //if email and password is correct
    const sessionId = uuidv4();

    res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn,
}