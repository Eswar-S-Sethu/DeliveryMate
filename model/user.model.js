const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

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