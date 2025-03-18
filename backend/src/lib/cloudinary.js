const cloudinary = require('cloudinary')
const {config} =require('dotenv')
config();


// here we are config the cloudinary name key and secret
cloudinary.config({
    cloud_name:process.env.CLOUDINAR_CLOUD_NAME,
    api_key:process.env.CLOUDINAR_API_KEY,
    api_secret:process.env.CLOUDINAR_API_SECRET 
})

module.exports = cloudinary;