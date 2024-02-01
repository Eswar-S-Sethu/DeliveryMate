const express = require('express');
const router = express.Router();
const { postUser, loginUser, getUsers, getCurrentUser } = require('../controller/user.controller.js');
const authenticateToken = require('../utils/authenticateToken.js');

router.post('/register',
    postUser
);

router.post('/login',
    loginUser);

router.get('/allUsers', authenticateToken,
    getUsers
);
router.get('/currentUser', authenticateToken,
    getCurrentUser
);

module.exports = router;