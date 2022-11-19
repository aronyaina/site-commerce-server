const User = require('../models/userModel')
const bodyParser = require("body-parser");


// login user
const loginUser = async (req, res) => {
    res.json({
        mssg: 'Login user'
    })
}

// signup user

const signupUser = async (req, res) => {

    const {
        name,
        surname,
        password,
        email,
        roles
    } = req.body
    try {
        const user = await User.signup(
            name,
            surname,
            password,
            email,
            roles)

        return res.status(200).json({
            email,
            user
        })

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    signupUser,
    loginUser
}