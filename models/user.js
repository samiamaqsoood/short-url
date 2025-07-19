const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
   name : {
    type : String,
    required : true,
   },
   email : {
     type : String,
    required : true,
    unique : true,
   },
   password : {
    type : String,
    required : true,
   },
   createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "users",
   }
}, {Timestamp: true})

const User = mongoose.model("user",userSchema);

module.exports = User;