const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// MIDDLEWARE verifiant le token dans .env
const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Vous avez besoins de vous authentifier",
    });
  }
  const token = authorization.split(" ")[1];
  
  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
 
    req.userId = await User.findOne({_id}).select("_id");
    req.userRole = await User.findOne({_id}).select("roles");
 
    next();
  } catch (error) {
  
    res.status(401).json({
      
      error: "La requete n'est pas autorise !",
    });
  }
};

module.exports = requireAuth;
