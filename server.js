const express = require("express")
const userRoute = require("./routes/user")
const productRoute = require('./routes/product')
const app = express();
const connectDB = require('./models/mongoConnect');
const {
    json
} = require("body-parser");
require('dotenv').config()

app.use(json())
app.use(express.urlencoded({
    extended: true
}));


connectDB();

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
app.use("/api/user", userRoute);

app.use("/api/product", productRoute);


app.listen(process.env.SERVER_PORT, () => {
    console.log("Listen on port ", process.env.SERVER_PORT);
});