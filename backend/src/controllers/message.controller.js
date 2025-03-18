const Message = require("../models/message.modle");
const User = require("../models/user.model");
const cloudinary  = require('../lib/cloudinary');
const { getReciverSocketId, io } = require("../lib/socket");
//this is user controller
const messageController =async(req,res)=>{
    console.log("message user api called");
    
    try{
        // here i ma getting the id from the req which comes from the proctedRoute
        const userId = req.user._id

        //here we are filtering all the user except itself and not getting the passward
        const filterUser = await User.find({_id :{$ne:userId}}).select("-passward");

        //sending the filterUser back to the user
        res.status(200).json({
            success:true,
            results:filterUser,
        })
    }
    catch (err){
        console.log("error ocurs in message controller",err);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

//this is message controller
const getMessage = async (req,res)=>{
    console.log("api from messageGet");
    

    try{
        //here we are grtting the id from the param
        const {id :userToChatId} = req.params;

        //here we are ectracting our id from the procted route
        const myId = req.user._id;

        //filter All the messages
        const messages = await Message.find({
            $or:[
                {senderId:myId ,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId}
            ]
        })
        
        //sennding the response back to the user with all the messagse
        res.status(200).json(messages)
    }
    catch (err){
        console.log("error ocurs in message controller",err);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

// this is a sendMessage controller
const sendMessage = async(req,res)=>{
    console.log("api called from send");
    
    try{
        //extraacting the text or image from the req.body
        const {text,image} = req.body;

        //extracting the id from the param
        const {id: reciverId} = req.params;

        const senderId = req.user._id;

        //getting the user id from the procted route
        const userId = req.user._id;

        //created a variable to store the image url
        let imageUrl;
        
        //checking if image is preesen the upload to the cloudaniry 
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        console.log(reciverId, senderId);
        
        //creating the new mesage
        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image:imageUrl
        })

        //save the newMessage
        await newMessage.save();



        //todo realtime func goes here => socket.io
        const reciverSocketId = getReciverSocketId(reciverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage)
        }
        //sending response back to the user
        res.status(200).json(newMessage)
    }
    catch (err){
        console.log("error ocurs in message controller",err);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

//contriner of messageController
const messageControllerContainer = {sendMessage,messageController,getMessage}

module.exports = messageControllerContainer;