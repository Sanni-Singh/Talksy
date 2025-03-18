const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// thisis a proteted middleware
const protectRoute = async(req,res,next)=>{
    try{
        // geting the token
        const token =await req.cookies.jwt ///here we are getting the token from the cookies
        // const token = await req.body.token;
        // const auth = await req.header.auth;
        // console.log(req.header);
        
        
        // console.log()

        // checcking the token if not througing the message
        if(!token) return res.status(400).json({success:false, message:"Unauthorized -No Token Provided"})
        
        // here we are decoding the token
        const decoded = jwt.verify(token,process.env.JWT_SCERET)
        
        // here we are putting condiition on decoded token
        if(!decoded) return res.status(401).json({success:false, message:"Unauthorize Token"})

        // finding the user by the id
        const user =await User.findById(decoded.userId).select("-passward")

        // checking if user present or not if not send a mesage
        if(!user) return res.status(404).json({success:false, message:"User doesn't found"})

        // adding user to the request to access any where
        req.user = user

        // calling the next middleware
        next()
    }
    catch (err) {
        console.log("Protected router erro", err)
        return res.status(500).json({success:false,message:"Internal Server error"})
    }
}

module.exports = protectRoute;