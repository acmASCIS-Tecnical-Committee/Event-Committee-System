// to use Router from it
const express = require("express");
// to use get/post requests from it
const router = express.Router();
// the user database schema
const User = require("../../models/user");
// to use for password encryption
const bcrypt = require("bcryptjs");

// validation functions
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

router.get("/test", (req, res) => {
  res.json("Testing user route");
});

// @route POST api/user/register
// @desc Register new user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            res.json(newUser);
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  res.json({
    emailbta3ak: { email },
    passwordk: { password },
    msg: "men webdeveloper naww??"
  });
});
module.exports = router;
