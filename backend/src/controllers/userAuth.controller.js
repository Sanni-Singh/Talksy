const User = require("../models/user.model");
const bcrypt  = require('bcrypt')
const generateToken = require('../lib/utils')
const cloudinary = require('../lib/cloudinary')
// this is out signUp controller
const signup = async (req,res)=>{
    console.log("api is calles");
    // here we are extracting fullName passward and email from the req.body
    const {fullName,email,passward} = req.body;

    // here we are cheking if any of them are like fullName,passward or email is empty so we are not going forward and send a meaage to filled
    if(!fullName || !email || !passward){
        return res.status(400).json({status:false, message:"all the are require to be filled"})
    }

    try{
        // Checking user passsword in less than 6 if then i am throughing a message
        if(passward.length < 6){
            return res.status(400).json({
                success:false,
                message:"Your Passward is too short"
            })
        }
        // Finding the user by their email address
        const user  = await User.findOne({email})

        // here i m checking if the user email is already exits in out database so we will throughing a message;
        if(user){ 
            return res.status(400).json({status:false,message:"this email is already exits"})
        }

        //  here we are creating a bcrypt genSalt with 10 number and we are hasing the passward that it will not show the original passward in the database
        const salt = await bcrypt.genSalt(10);
        const hashPassward = await bcrypt.hash(passward,salt);


        // here we are creating a new User in out database with the email fullName and hashPassward
        const newUser =  new User({
            fullName:fullName,
            email:email,
            passward:hashPassward
        })

        // here  we are checking the valid user
        if(newUser){
            // where we are generating the token with the help of fn and we are passing the newUserID and the res 
            // generateToken(newUser._id,res)  //there we are not storing the token in the local storage

            const token = generateToken(newUser._id,res) //here wwe are storing a token in vari...

            // here we are saving the user to the dataBase
            await newUser.save()


            // here we are sending a success meassge that the user is created
            res.status(200).json({
                success:true,
                results:{
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    profilePic:newUser.profilePic,
                    token:token
                }
            })
        }
        else {
            // if user is not throughing a message 
            res.status(400).json({status:false,message:"Invalid user data"})
        }

    }
    catch (err){
        // it will print the error if a error comes in signUp controller
        console.log("error in signUp controller",err)

        // here we are sending a server error message to the usr that something went wrong 
        res.status(500).json({status:false,message:"Internal server error"})
    }
}

// this is our login controller
const login = async(req,res)=>{
    
    try{
        // here i am extracting the email and passward from the req.body
        const {email , passward} = req.body;
        console.log("api called of login user");
        
        // checking both email and passward are not empty if it then throunghing a message
        if(!email || !passward) return res.status(400).json({success:false, message:"All the field are required to be field"})

        // finding the user from the database
        const userData =await User.findOne({email})

        // checking if usr is present or not if not then throughing messgae
        if(!userData) return res.status(404).json({status:false, message:"User not found"})

        // checking the user passward
        const validUser = await bcrypt.compare(passward,userData.passward)

        // checking for the valid user 
        if(validUser){
            // creating the token
            // generateToken(userData._id, res) ///here we are not storing the token 
            const token = generateToken(userData._id, res) ///here we are  storing the token in a vari... 

            // sending response to the user for success
            res.status(200).json({
                success:true,
                results:{
                    _id:userData._id,
                    fullName:userData.fullName,
                    email:userData.email,
                    profilePic:userData.profilePic,
                    token:token,
                }
            })
        }
        else {
            // thoughing a message the uer is not valid
            return res.status(400).json({succes:false,message:"Invalid credentails"})
        }
    }
    catch (err){
        // here we can check the debugging of our login controller
        console.log("error found on the user login controller", err)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

// this is our logout controller
const logout = (req,res)=>{
    console.log("logout api called");
    
    try{

        // clearing the cookie of the privius login filed
        res.cookie("jwt","",{maxAge:0})

        // sending the message of logout succesfully
        res.status(200).json({success:true,message:"user logout successFully"})
    }
    catch (err) {
        // here we are logging the logout controller
        console.log("error occur in logout controller",err)
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

// this is our uppdate-profile controller
const updateProfile = async(req,res)=>{
    console.log("uploading profile api is called");
    
    try{
        // here we are extracting the profilePic from req.body
        const profilePic= req.body.profilePic

        // checing if profilePic is not aviliable the sending the message
        if(!profilePic) return res.status(400).json({success:false,message:"profilePic is Nessary to Give"})

        // here we are extracting the userId which we are passed in the procted middleware
        const userId = req.user._id;

        // we are uploading the profilePic to the cloudinary
        const uploadedRes = await cloudinary.uploader.upload(profilePic);

        // update the user with the profilePic
        const uploadUser = await User.findByIdAndUpdate(userId,{profilePic:uploadedRes.secure_url},{new:true})

        // sending the response of success to the user
        res.status(200).json({success:true,message:"ProfilePic Updated successfully"})
    }
    catch (err){
        console.log("uploading profilePic got crashed",err)
        return res.status(500).json({success:false,message:"Internal Server error"})
    }
}

// this is normal check controller
const checkAuth = async(req,res)=>{
    try{
        // sending the user as a response
        res.status(200).json(req.user)
    }
    catch (err){
        console.log("errro catch in the check controller", err)
        res.status(500).json({success:false, messgae:"Internal server error"})
    }
}
// here we are attaching all the controler in a obj and then we are returning that obj;
const controllers = {signup,login,logout,updateProfile,checkAuth}
module.exports = controllers;