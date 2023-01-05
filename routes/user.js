const express = require("express");
// ROUTES DES UTILISATEURS
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