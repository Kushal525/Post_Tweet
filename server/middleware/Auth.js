 const jwt = require('jsonwebtoken');

 const validateToken = (req, res, next) => {
     const accessToken = req.header("accessToken");

     
     if(!accessToken) return res.json({error: "You are not logged in"})

     try{
         const validToken = jwt.verify(accessToken, "seosaphAssignmentAuthentication")
         res.user_id = validToken._id
         if(validToken){
             return next()
         }
     }catch(error){
         return res.json({error:error})
     }
 }

 module.exports = {
     validateToken
 }