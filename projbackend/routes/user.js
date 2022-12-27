const express = require("express");
const router = express.Router();

const {getUserById, getUser} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/getUser/:userId", isSignedIn, isAuthenticated, getUser);


module.exports = router