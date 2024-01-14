const mongoose = require('mongoose');

const User = mongoose.model('user', {
    name: String,
    email:{
        type:String,
        unique:true
    },
    username: {
        type:String,
        unique:true
    },
    password:String,
    usertype:String,
    registrationdate:Date,
    lastlogin:Date,
});

// for storing requests
const Requests=mongoose.model('requests',{
    title:String,
    description:String,
    pickuplocation:String,
    deliverylocation:String,
    requeststatus:String,
});
 

module.exports =  {User,Requests}