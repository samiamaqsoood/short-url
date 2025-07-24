const {getUser} = require("../services/auth")

// async function restrictToLoggedInUser(req, res, next){
//     const userUid = req.cookies?.uid;
//      if(!userUid)
//         return res.redirect("/login");

//      const user = getUser(userUid);
//      if(!user)
//         return res.redirect("/login");

//      req.user = user;
//      next();
// }

// async function checkAuth(req,res,next) {
//     const userUid = req.cookies?.uid;
//      const user = getUser(userUid);
//      req.user = user;
//      next();
// }

// authrization 
function checkForAuthentication(req,res,next){
   // const authorizationHeaderValue = req.headers["authorization"];
   const cookieToken = req.cookies?.uid;
   req.user = null;

   // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
      // return next();

   if(!cookieToken) return next();

   // const token = authorizationHeaderValue.split("Bearer ")[1];
   const token = cookieToken;
   const user = getUser(token);
   req.user = user;
   return next();
}

function restrictTo(roles = []){
   return function(req,res,next){
      if(!req.user) return res.redirect("/login")
         
      if(!roles.includes(req.user.role)) return res.end("Unauthorized");

      return next();
   }

}
module.exports = {
   //  restrictToLoggedInUser,
   //   checkAuth,
     checkForAuthentication,
     restrictTo,
}