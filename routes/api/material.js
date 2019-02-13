// to use Router
const express = require("express");
// to use get/post requests from it
const router = express.Router();
// to authenticate the private routes
const passport = require("passport");
// to cast string to database id
const mongoose = require("mongoose");

// load material schema
const Material = require("../../models/material");
const Store = require("../../models/store");

// validation functions
const validateMaterial = require("../../validation/material");

// @route GET api/material/test
// @desc Test the route
// @access public
// @return message if working
router.get("/test", (req, res) => {
  res.json("Testing material page");
});

// @route POST api/material/register
// @desc add a new material to the database
// @access private (logged in users only)
// @return success: {message} if succeded
// @terminal log errors if there's internal error in server
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMaterial(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Material.findOne({ name: req.body.name }).then(material => {
      if (!material) {
        const newMaterial = new Material(req.body);
        // for (var i = 0; i < newMaterial.providers.length; i++) {
        //   let temp = {};
        //   Store.findById(
        //     mongoose.Types.ObjectId(newMaterial.providers[i].store_id)
        //   ).then(store => {
        //     temp = store._id;
        //   });
        //   newMaterial.providers[i].store_id = temp;
        // }
        console.log(newMaterial);
        res.json(newMaterial);
        newMaterial
          .save()
          .then(material => res.json(material))
          .catch(err => console.log(err));
      } else {
        json.status(400).json({ message: "Duplicated entry" });
      }
    });
  }
);
module.exports = router;
