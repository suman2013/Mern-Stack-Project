const express = require('express')
const router = express.Router();

//Importing functions
const {signup, signout} = require("../controllers/auth");

//Routers
router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;
