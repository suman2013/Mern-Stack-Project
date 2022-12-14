require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Import files
const authRoutes = require("./routes/auth");

//Database connection
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED");
}).catch(() => console.log("DB connection error"));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);

//Declaring port
const port = process.env.PORT || 8000;

//Starting server
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
