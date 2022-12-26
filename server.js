const express = require("express");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const uploadRoute = require("./routes/upload");
const orderRoute = require("./routes/order");

const path = require("path");
const connectDB = require("./config/mongoConnect");
const { json } = require("body-parser");
const app = express();
require("dotenv").config();

app.use(json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

// use the express.static middleware to serve static files
app.use(express.static("./upload"));
app.use("/api/user", userRoute);
app.use((req, res, next) => {
  next();
});
app.use("/api/upload", uploadRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server listen on port :", process.env.SERVER_PORT);
});
