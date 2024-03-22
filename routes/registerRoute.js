const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {isAuthenticated,isAdmin} = require('../midlewares/jwtAuthorization')
router.post('/register',userController.registerUser)
router.post('/login',userController.login)
router.get('/users/:email',userController.getUserByEmail)
router.put('/users/update/:email',userController.updateUser)
router.get('/users',/*isAuthenticated,isAdmin,*/userController.getAllUsers)

module.exports=router