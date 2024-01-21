const express = require('express')
const { logErrors, errorHandler } = require('./utils/errorHandler.js')
let userRoutes = require('./routes/user.routes.js');
const path = require('path');
const app = express()
const port = 3000 | process.env.port

//database connection
require('./utils/dbConnection')
app.use(express.static(__dirname + '/public'))
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

app.get('/request-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/requestManagement/requestManagement.html'));
});
app.get('/account-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/accountManagement/accountManagement.html'));
});


//backend routes
app.use('/api/user', userRoutes)

//error handling
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`litening st ${port}`)
})