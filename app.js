const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
const userRoutes = require('./routes/user.routes.js');
const deliveryRoutes = require('./routes/deliveryRequest.routes.js');
const acceptedRequest = require('./routes/acceptedRequest.routes.js');
const authenticateToken = require('./utils/authenticateToken.js')
const path = require('path');
const app = express()
const server=http.createServer(app);
const io=new Server(server);
const port = 3000 | process.env.port

//database connection
require('./utils/dbConnection')
app.use(express.static(__dirname+'/public'))
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

io.on('connection',(socket)=>{
    console.log('user connected');

    socket.on('chatMessage',(msg)=>{
        io.emit('chatMessage',msg);
    });
    socket.on('disconnect',()=>{
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


//backend routes
app.use('/api/user', userRoutes)
app.use('/api/delivery', authenticateToken,deliveryRoutes)
app.use('/api/accepetedRequest', authenticateToken,acceptedRequest)

//error handling
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`litening st ${port}`)
})