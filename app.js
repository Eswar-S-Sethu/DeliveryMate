const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
let userRoutes = require('./routes/user.routes.js');
const path = require('path');
const app = express()
const http=require('http')
const {Server}=require("socket.io")

const server=http.createServer(app);
const io=new Server(server);
const port = 3000 || process.env.port

//database connection
require('./utils/dbConnection')
app.use(express.static(__dirname+'/public'))
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
    res.sendFile(path.join(__dirname + '/public/home/home.html'));
})

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for chatMessage event from clients
    socket.on('chatMessage', (msg) => {
        // Broadcast message to all clients
        io.emit('chatMessage', msg);
    });

    // Optional: Handle message read event
    socket.on('messageRead', (msg) => {
        // Implement logic for read receipt
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//backend routes
app.use('/api/user', userRoutes)

//error handling
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`litening st ${port}`)
})