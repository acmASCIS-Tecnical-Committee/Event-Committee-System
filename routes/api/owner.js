const express = require("express");

const router = express.Router();

const Owner = require("../../models/owner");

const bcrypt = require("bcryptjs");

const validateRegisterInput = require("../../validation/owner");

router.get("/test", (req, res) => {
  res.json("Owner route works");
});

router.post("/register", (req, res) => {
  console.log("******" + req.body.name + req.body.email);
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    Owner.findOne({ email: req.body.email }).then(owner => {
      if (owner) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newOwner = new Owner({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          social_media: req.body.social_media
        });
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newOwner.password, salt, (error, hash) => {
            newOwner.password = hash;
            newOwner
              .save()
              .then(owner => req.json(owner)) //????
              .catch(console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;
