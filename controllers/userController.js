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

  try {
    const { id, roles } = await User.findOne({ email: email }).select("roles");
    console.log("roles in login", roles);
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
      error: error.message,
    });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { name, surname, password, email, roles } = req.body;
  try {
    const user = await User.signup(name, surname, password, email, roles);
    const token = createToken(user._id);

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
