const shortid = require("shortid");
const URL = require("../models/url");

async function handleGetShortURL(req, res) {
  const body = req.body;
    console.log(body)

  if (!body.url) {
    return res.status(400).json({ msg: "URL is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // return res.status(201).json({ id: shortID });
  return res.render("Home", {
    id: shortID,
  })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    res.json({totalClicks: result.visitHistory.length ,
         Analytics: result.visitHistory})
}

module.exports = {
  handleGetShortURL,
  handleGetAnalytics,
};
