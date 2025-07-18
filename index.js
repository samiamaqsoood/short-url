const express = require('express')
const urlRoute = require("./routes/url")
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url");
const path = require('path');
;

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
   //direct req to route
app.use("/url", urlRoute);

app.get('/:shortId',async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push:{
        visitHistory : {
            Timestamp : Date.now(),
        }
    }})
    res.redirect(entry.redirectURL);
})

//ger all users
app.get("/url/test/" , async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('Home', {
        urls : allUrls,
    });

})

app.listen(PORT, ()=>{
    console.log("Server is listening to port ",PORT);
})