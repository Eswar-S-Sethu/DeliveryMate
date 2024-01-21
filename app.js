const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
let userRoutes = require('./routes/user.routes.js');
const path = require('path');
const app = express()
const port = 3000 | process.env.port

//database connection
require('./utils/dbConnection')
<<<<<<< HEAD
app.use(express.static(__dirname + '/public'))
=======
app.use(express.static(__dirname+'/public'))
>>>>>>> f6a4d413a32b34563cdb093ada0eab2a3caba730
//frontend routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/register/register.html'));
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/home/home.html'));
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

<<<<<<< HEAD
app.get('/request-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/requestManagement/requestManagement.html'));
});
app.get('/account-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/accountManagement/accountManagement.html'));
});


=======
>>>>>>> f6a4d413a32b34563cdb093ada0eab2a3caba730
//backend routes
app.use('/api/user', userRoutes)

//error handling
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`litening st ${port}`)
})