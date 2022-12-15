const User = require("../models/user");
const {check, validationResult} = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");

//sign up
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(402).json({
      error: errors.array()[0].msg
    })
  }

  const user = new User(req.body);

  user.save((err, user) => {
    if(err){
      res.status(400).json({
        err: "Something went wrong"
      });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

//Sign in
exports.signin = (req, res) => {
  const {email, password} = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(402).json({
      error: errors.array()[0].msg
    })
  }

  User.findOne({email}, (err, user) => {
    if(err){
      return res.status(402).json({
        error:"User email not found"
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and password does not match"
      })
    }

    //create token
    const token = jwt.sign({id: user._id}, process.env.SECRET);
    res.cookie("token", token, {expire: new Date() + 9999});

    //send response
    const {_id, name, Email, role} = user;
    return res.json({token, user: {_id, name, Email, role}});
  })
};

//Sign out
exports.signout = (req, res) => {
  res.json({
    message: "Signed out successfully"
  });
};
