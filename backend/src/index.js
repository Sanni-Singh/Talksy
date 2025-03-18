const express   = require('express')
const dotenv   = require('dotenv')
const appRouter = require('./routes/userAuth.route')
const connectingDB = require('./lib/database')
const messageRouter = require('./routes/message.route')
const cors = require('cors')
const path = require('path')

const cloudinary = require('cloudinary').v2;

//getting the server from the socket file
const {app,server} = require('./lib/socket')
// const app = express();

const cookieParser = require('cookie-parser');

dotenv.config() //this will help us to get the config the data from the dotEnv file
const PORT = process.env.PORT

// const __dirname = path.resolve();

// here we are adding a middleware to get a data into a readable formate
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

//this is a cookies pareser  
app.use(cookieParser());

// here we are calling  api of Auth
app.use('/api/v1/auth',appRouter)

// here we are calling a api for messages
app.use('/api/v1/messages',messageRouter)

// const __dirname = path.resolve();
path.resolve();
// console.log(path.resolve());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


// here we are running or server
server.listen(PORT,()=>{
    connectingDB();
    console.log(`Server is running on ${PORT} Port`)
})

