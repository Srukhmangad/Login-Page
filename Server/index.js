const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors())
app.use(express.json())


const Mongo_URL = process.env.Mongo_URL || 'mongodb://127.0.0.1:27017/loginDetails';
const PORT = process.env.PORT || 3000;

mongoose.connect(Mongo_URL)
    .then(() => console.log('Connected to database!'));


const UserRouter = require("./routes/UserRouter");
app.use(UserRouter);




app.listen(PORT, () => {
    console.log("server running");
})