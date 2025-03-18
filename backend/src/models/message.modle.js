const mongoose =require('mongoose')

// creating schema for the message
const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

module.exports = Message;