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
    .then(() => console.log("DB connected"))
    .catch(() => console.error);

module.exports = connectDB;
