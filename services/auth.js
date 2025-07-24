// session ID store and get to verify

// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user)
// }

// function getUser(id,user){
//    return sessionIdToUserMap.get(id)
// }


//JWT sign and verify tokens

const jwt = require("jsonwebtoken")
const secret = 'hynkishynki@00608';

function setUser(user){
   const payload = {
    id: user._id.toString(),  // convert ObjectId to string
    name: user.name,
    email: user.email,
    role : user.role,
  };

console.log("user :",user);
     return jwt.sign(payload, secret)
}

function getUser(token){
    console.log("token:", token)
    if(!token) return null;
    
   return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser,
}