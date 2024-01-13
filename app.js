const express = require('express')
const app = express()
const port = 3000 | process.env.port

app.listen(port,()=>{
    console.log(`litening st ${port}`)
})