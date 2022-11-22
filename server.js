const express = require("express")
const userRoute = require("./routes/user")
const productRoute = require('./routes/product')
const app = express();
const connectDB = require('./models/mongoConnect')
require('dotenv').config()

app.use(express.urlencoded({
    extended: true
}));


connectDB();

app.use("/api/user", userRoute);

app.use("/api/product", productRoute);

app.get("/", (req, res) => {
    res.send("Hello world from principal root !");
});


app.listen(process.env.SERVER_PORT, () => {
    console.log("Listen on port ", process.env.SERVER_PORT);
});