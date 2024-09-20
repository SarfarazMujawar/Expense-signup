const express = require('express');
const router = express.Router();
const {signup, login, logout, verifyToken} = require('../Controller/AuthController')
const {loginValidation,signupValidation} = require('../Middleware/AuthValidation')
const authToken =require( '../Middleware/authToken');

router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)
router.get('/home',authToken,(req,res)=>{
    res.status(200).json({ message: 'Welcome to the home page!', user: req.user });
})
//logout route

router.post('/logout',logout);
router.get('/verify-token',verifyToken)

module.exports = router;