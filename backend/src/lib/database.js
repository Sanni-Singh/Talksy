const mongoose = require('mongoose');

const connectingDB =async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo db is coonneced succseefully")
    }
    catch(err){
        console.log(`mongoose erro ${err}`);
        
    }
}

module.exports = connectingDB;