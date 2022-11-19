const express = require("express")
const userRoute = require("./routes/user")
const app = express();
const bodyParser = require("body-parser");
const connectDB = require('./models/mongoConnect')
app.use(express.urlencoded({
    extended: true
}));

connectDB();

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
    res.send("Hello world from principal root !");
});


app.listen(5000, () => {
    console.log("Listen on port 5000");
});