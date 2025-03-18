
const jwt = require('jsonwebtoken')

// this fn help us to create the token with the help of jwt
const generateToken = (userId,res)=>{
    // here the token is created which expire in 7 days
    const token = jwt.sign({userId},process.env.JWT_SCERET,{
        expiresIn:"7d"
    })
    // here we are sending the jwt and the token
    res.cookie('jwt',token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, //this is 7 days in miliSec
        // httpOnly:true, //prevent the XSS attacts cross-site secripting attacts
        // sameSite:"Lax", //CSRD attacts cross-site request forgery attacts
        // secure:process.env.NODE_ENV === "production" //this is demoting that the re is http ot https in production is true otherwise is will false
    })

    return token;
}

module.exports = generateToken;