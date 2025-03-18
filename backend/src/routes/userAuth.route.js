const express  = require('express')
const router = express.Router();
const controllers = require('../controllers/userAuth.controller')
const protectRoute = require('../middleware/userAuth.middleware')
const checkAuth  = require('../controllers/userAuth.controller')
// this is a login req api
router.post('/login',controllers.login)

// This is logout api
router.post('/logout',controllers.logout)

// this is signUp api
router.post('/signup',controllers.signup)

// this is update-profile api
router.put('/update-profile',protectRoute , controllers.updateProfile)


// this is check api
router.get('/check',protectRoute,controllers.checkAuth)

// here we have export out router
module.exports = router;