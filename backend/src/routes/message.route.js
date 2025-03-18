const express = require('express');
const protectRoute = require('../middleware/userAuth.middleware');
const messageControllerContainer = require('../controllers/message.controller');
const router = express.Router();

// this is a user end point
router.get('/users',protectRoute,messageControllerContainer.messageController)

//this is a getMessage end point 
router.get("/:id",protectRoute,messageControllerContainer.getMessage)

// this is a posting message end point 
router.post('/send/:id', protectRoute,messageControllerContainer.sendMessage)

// here we are exporing the router
module.exports = router;