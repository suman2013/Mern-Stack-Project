const User = require("../models/user");

//sign up
exports.signup = (req, res) => {
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

//Sign out
exports.signout = (req, res) => {
  res.json({
    message: "Signed out successfully"
  });
};
