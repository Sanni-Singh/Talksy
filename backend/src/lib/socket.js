const express = require('express');
const { Server } = require('socket.io')
const http = require('http')

const app = express();
const server = http.createServer(app); 


const io = new Server(server , {
    cors:{
        origin :['http://localhost:5173']
    }
});

const  getReciverSocketId = (userId)=>{
    return socketMap[userId]
}

const socketMap = {};

io.on("connection",(socket)=>{
    console.log("A user is connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) socketMap[userId] = socket.id

    io.emit("onlineUsers",Object.keys(socketMap))


    socket.on('disconnect',()=>{
        console.log("A user is disconnected", socket.id)
        delete socketMap[userId];
        io.emit("onlineUsers" , Object.keys(socketMap))
    }) 
})

module.exports = {io , app, server, getReciverSocketId}