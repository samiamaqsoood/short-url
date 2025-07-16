const {nanoid} = require('nanoid');
const URL = require("../models/url")

async function  handleGetShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: "URL is required"})
    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : [],
    })

    return res.status(201).json({id: shortId});

}

module.exports = {
    handleGetShortURL,
}