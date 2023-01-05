// Connexion to database
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () =>
  mongoose
    .connect(
      process.env.DATABASE_URI +
        ":" +
        process.env.DATABASE_PORT +
        "/" +
        process.env.DATABASE_COLLECTION_NAME,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("Connected to mongodb database:" + process.env.DATABASE_PORT))
    .catch(() => console.error);

module.exports = connectDB;
