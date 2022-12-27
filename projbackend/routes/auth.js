const express = require('express')
const router = express.Router();
const {check, validationResult} = require("express-validator");
//Importing functions
const {signup, signin, signout, isSignedIn, isAuthenticated} = require("../controllers/auth");

//Routers
//Sign up
router.post("/signup", [
  check("name").isLength({min: 3}).withMessage("Name should have atleast 3 char"),
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({min:5}).withMessage("Password should have atleast 5 char")
], signup);

//Sign in
router.post("/signin", [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isLength({min: 1}).withMessage("Password is required")
], signin);

//Sign out
router.post("/signout", signout);

//protected router
router.get("/protected", isSignedIn,isAuthenticated, (req, res) => {
  res.send("protected route");
});

module.exports = router;
