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
    password:String
});

module.exports =  User