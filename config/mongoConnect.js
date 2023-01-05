// Connexion to database
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () =>
  mongoose
    .connect(
      process.env.DATABASE_URI +
        process.env.DATABASE_USER +
        ":" +
        process.env.DATABASE_PASSWORD +
        "@cluster0.xoe6tsl.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to online mongodb database."))
    .catch((e) => console.log("error", e));

module.exports = connectDB;
