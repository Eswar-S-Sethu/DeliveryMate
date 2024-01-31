const express = require('express');
const router = express.Router();
const { postUser, loginUser, getUsers } = require('../controller/user.controller.js');
const authenticateToken = require('../utils/authenticateToken.js');

router.post('/register',
    postUser
);

router.post('/login',
    loginUser);

router.get('/allUsers', authenticateToken,
    getUsers
);


module.exports = router;