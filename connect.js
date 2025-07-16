const mongoose = require('mongoose');

async function connectToMongoDB(url){
    return mongoose.connect(url)
    .then(()=>
    console.log("MongoDB connected successfully!"))
    .catch((err)=>{
        console.log("Can not connect to MongoDB ",err);
    });
}

module.exports ={
    connectToMongoDB,
}