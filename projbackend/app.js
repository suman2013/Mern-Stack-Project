require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();


//Database connection
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED");
}).catch(() => console.log("DB connection error"));

//Server connection and starting
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
