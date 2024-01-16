const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
let userRoutes = require('./routes/user.routes.js');
const path = require('path');
const app = express()
const port = 3000 || process.env.port

//database connection
require('./utils/dbConnection')
app.use(express.static(__dirname+'/public'))
//frontend routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/register/register.html'));
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//backend routes
app.use('/api/user', userRoutes)

//error handling
app.use(logErrors)
app.use(errorHandler)
// ------------------------------------------------------------------------------------
// socket setup
// we get the userID and receiverID from the database, will implement that part soon
let users = {};  // is an object that maps userIds to their socket IDs.

io.on('connection', (socket) => {  // listens for new socket connections.
    console.log('A user connected');

    socket.on('register', userId => {  // handles user registration by storing their socket ID.
        users[userId] = socket.id;
    });

    socket.on('send_message', ({ senderId, receiverId, message }) => { //  handles sending messages from one user to another.
        if (users[receiverId]) {
            io.to(users[receiverId]).emit('new_message', { senderId, message });
        }
    });

    socket.on('disconnect', () => {   //  removes the user's socket ID upon disconnection.
        console.log('User disconnected');
        for (let userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
    });
});
// ----------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`litening st ${port}`)
})