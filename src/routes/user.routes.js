const express = require('express')

const router = express.Router()

const userController = require('../controllers/user.controller')

const isAuthenticated = require('../middlewares/user.middleware')

 router.post('/register',userController.registerUser)

 router.post('/login',userController.loginUser)
 router.get('/profile',isAuthenticated,userController.getProfile)





module.exports = router;

