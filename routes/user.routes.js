const express = require('express');
const router = express.Router();
const {postUser, loginUser, getUsers} = require('../controller/user.controller.js');
const authenticateToken = require('../utils/authenticateToken.js');

router.post('/register', function(req,res,next){
    postUser(req,res,next);
});

router.post('/login', function(req,res,next){
    loginUser(req,res,next);
});

router.get('/allUsers', authenticateToken,function(req,res,next){
    getUsers(req,res,next);
});


module.exports = router;