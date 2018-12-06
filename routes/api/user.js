const express = require("express");
const router = express.Router();

// validation functions
const validateLoginInput = require("../../validation/login");
router.get("/test", (req, res) => {
  res.json("Testing user route");
});

router.get("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(error);
  }

  const email = req.body.email;
  const password = req.body.password;

  res.json({
    emailbta3ak: { email },
    passwordk: { password },
    msg: "men webdeveloper naww"
  });
});

module.exports = router;
