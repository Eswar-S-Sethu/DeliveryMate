const User = require("../model/user.model")
const generateAccessToken = require("../utils/generateToken")
const bcrypt = require("bcrypt") // used for encrypting passwords using salting method. 

// this is to create a new user. gets the username and password 
const postUser = async (req, res, next) => { // async allows to use the await in it
    let userdata = req.body // userdata variable stores the data from the html file as json file.
    userdata.password = await bcrypt.hash(userdata.password, 10) // waits until the bcrypt encrypts the password
    try {
        const user = new User(userdata)
        const validationUser = await user.validate() // waits till user is validated
        let data = await user.save() // pauses the execution till the new user data is saved to the database.

        if (data) {
            const token = await generateAccessToken(data._id) // waits till an access token is generated.
            data = { ...data.toJSON(), token }
            return res.json({ statusCode: 200, data, message: 'success' });
        }
    }
    catch (err) {
        next(err)

    }
}

const loginUser = async (req, res, next) => {
    try {
        const userData = await User.findOne({ username: req.body.username })
        if (userData) {
            const verifyPassword = await bcrypt.compare(req.body.password, userData.password)
            if (verifyPassword) {
                return res.json({
                    statusCode: 200, data: {
                        token: generateAccessToken(userData._id)
                    }, message: 'success'
                })
            }
            next('Wrong Credentials')
        }else{
            next('No such user')
        }
    } catch (err) {
        next(err)
    }
}

const getUsers = async (req, res, next) => {
    try {
        let data = await User.find({})
        if (data) {
            return res.json({ statusCode: 200, data, message: 'success' });
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = { postUser, getUsers, loginUser }