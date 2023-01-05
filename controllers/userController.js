// CONNEXION  ET INSCRIPTION AVEC LE TOKEN DE 3J
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// createToken function
const createToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "3d",
    }
  );
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let emptyField = [];

  if (!email) {
    emptyField.push("votre email.");
  }

  if (!password) {
    emptyField.push("votre mot de passe.");
  }
  
  if (emptyField.length > 0) {
    return res.status(400).json({
      error: `Veuiller completer ${emptyField[0]}`,
    });
  }
  try {
    const { id, roles } = await User.findOne({ email: email }).select("roles");

    const user = await User.login(email, password);
    const token = createToken(user._id);

    return res.status(200).json({
      email,
      roles,
      id,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Compte inexistant veuiller vous inscrire",
    });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { name, surname, password, email ,roles} = req.body;
  // const roles = "admin"
  let emptyField = [];

  if (!name) {
    emptyField.push("votre nom.");
  }
  if (!surname) {
    emptyField.push("votre surnom.");
  }
  if (!email) {
    emptyField.push("votre email.");
  }
  if (!password) {
    emptyField.push("votre mot de passe.");
  }
  

  if (emptyField.length > 0) {
    return res.status(400).json({
      error: `Veuiller completer ${emptyField[0]}`,
    });
  }
  try {
    const user = await User.signup(name, surname, password, email);
    const token = createToken(user._id);
    const { id, roles } = await User.findOne({ email: email }).select("roles");
    
    return res.status(200).json({
      email,
      token,
      roles,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
