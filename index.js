const express = require('express')
const urlRoute = require("./routes/url")
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url");
;

const app = express();
const PORT = 8001;

// connect to DB 
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")


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

app.listen(PORT, ()=>{
    console.log("Server is listening to port ",PORT);
})