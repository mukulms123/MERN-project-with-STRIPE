const User = require("../models/user");
const {validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signin = (req, res) => {
  var err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({
      err: err.array()[0].msg,
    });
  }

  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    //if error in finding user
    if (err || !user) {
      return res.status(400).json({
        err: "User email doesn't exists",
      });
    }

    //if user password doesn't match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Email and password doesn't match.",
      });
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, {expire: new Date() + 999});

    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, name, email, role}});
  });
};

exports.signup = (req, res) => {
  console.log("Sign up initialized");
  // console.log("req: ", req.body);
  var err = validationResult(req);
  // console.log("error: ", err);
  if (!err.isEmpty()) {
    return res.status(400).json({
      err: err.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    } else {
      return res.json(user);
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signed out successfuly",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      err: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "You are not ADMIN, Access denied",
    });
  }
  next();
};
