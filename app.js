const express = require('express')
const { logErrors, errorHandler } =  require('./utils/errorHandler.js')
let userRoutes = require('./routes/user.routes.js');
const app = express()
const port = 3000 | process.env.port

require('./utils/dbConnection')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/user',userRoutes)
app.use(logErrors)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`litening st ${port}`)
})