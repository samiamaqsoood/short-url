const express = require('express')

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const {connectToMongoDB} = require("./connect")
const URL = require("./models/url");
const path = require('path');
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUser, checkAuth} = require("./middlewares/auth")

const app = express();
const PORT = 8001;

// connect to DB 
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")

// views - UI
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares

//to parce req bodyy
app.use(express.json());
//to parce form data 
app.use(express.urlencoded({extended:false}));
//to parse cookies
app.use(cookieParser());

//Home page
app.use("/",checkAuth, staticRoute);
//direct req to route
app.use("/url",restrictToLoggedInUser, urlRoute);
//user route
app.use("/user", userRoute);

app.get('/:shortId',async (req, res)=>{
    const shortId = req.params.shortId;
       // Avoid handling favicon.ico requests
    if (shortId === 'favicon.ico') return res.status(204).end();
    const entry = await URL.findOneAndUpdate({shortId}, {$push:{
        visitHistory : {
            Timestamp : Date.now(),
        }
    }})
    console.log("Redirecting for shortId:", shortId);
console.log("Entry found:", entry);
  if (!entry) {
    return res.status(404).send("Short URL not found!");
  }


    res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=>{
    console.log("Server is listening to port ",PORT);
})