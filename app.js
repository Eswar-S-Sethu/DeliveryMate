const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
const userRoutes = require('./routes/user.routes.js');
const deliveryRoutes = require('./routes/deliveryRequest.routes.js');
const acceptedRequest = require('./routes/acceptedRequest.routes.js');
const notificationRequest = require('./routes/notification.routes.js');
const authenticateToken = require('./utils/authenticateToken.js')
const path = require('path');
const app = express()

// for user active or inactive states
const socket = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = socket(server);

// Connected users set
const connectedUsers = new Set();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for user joining for presence
    socket.on('joinPresence', ({ userId }) => {
        connectedUsers.add({ userId, socketId: socket.id });

        // Notify everyone about the updated user presence
        io.emit('userPresence', getUserPresence(userId));
    });

    // Listen for user disconnecting
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        // Remove user from the set of connected users
        connectedUsers.delete(socket.id);

        // Notify everyone about the updated user presence
        io.emit('userPresence', getUserPresence());
    });
});

function getUserPresence(userId) {
    const isUserOnline = Array.from(connectedUsers).some(user => user.userId === userId);
    return isUserOnline ? 'Online' : 'Offline';
}
async function getUserInfo() {
    const userToken = localStorage.getItem('token');

    try {
        const response = await fetch('/api/user/currentuser', {
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const responseData = await response.json();
        console.log(responseData)

        return responseData;
    }
    catch (error) {
        console.log("Error:".error);
    }
}

const port = 3000 | process.env.port

//database connection
require('./utils/dbConnection')
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static(__dirname + '/uploads')); // Serve images from the uploads directory


//frontend routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/requestboard.html'));
})
app.get('/new-request', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/createrequest.html'));
})
app.get('/forget-password', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/forget-password/forget-password.html'));
})
app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/reset-password/reset-password.html'));
})
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/request-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/requestManagement/requestManagement.html'));
});
app.get('/account-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/accountManagement/accountManagement.html'));
});
app.get('/accepted-request', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/acceptedRequest/acceptedRequest.html'));
});
app.get('/notification', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/notification/notification.html'));
});



//backend routes
app.use('/api/user', userRoutes)
app.use('/api/delivery', authenticateToken, deliveryRoutes)
app.use('/api/accepetedRequest', authenticateToken, acceptedRequest)
app.use('/api/notification', authenticateToken, notificationRequest)


//error handling
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`litening st ${port}`)
})