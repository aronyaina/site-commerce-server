const express = require("express");

const router = express.Router();

// controler setup
const {
    signupUser,
    loginUser
} = require("../controllers/userController")

// login 
router.post('/login', loginUser);


// register
router.post('/signup', signupUser);

module.exports = router