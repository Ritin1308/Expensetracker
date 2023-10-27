// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 4000

// body-parser

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// DB Connection
mongoose.connect(process.env.URI)
const db = mongoose.connection

// error handling
db.on("error", (error) => {
    console.log("Error Occured!", error);
})
// connection established
db.once("open", () => {
    console.log("Connection Established with DB!")
})

app.set('view engine', "ejs")

app.use("", require("./routes/routes"))

app.listen(PORT, () => {
    console.log("Server Started !")
})