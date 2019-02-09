// to use Router
const express = require("express");
// to use get/post requests from it
const router = express.Router();
// to authenticate the private routes
const passport = require("passport");

// load store schema
const Store = require("../../models/store");

// validation functions
const validateStore = require("../../validation/store");

// @route GET api/store/test
// @desc Test the route
// @access public
// @return message if working
router.get("/test", (req, res) => {
  console.log(Store.schema.tree);
  res.json("Testing store page");
});

// @route POST api/store/register
// @desc add a new store to the database
// @access private // logged in users
// @return msg:saved to the database if success
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStore(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Store.findOne({ name: req.body.name, mobile: req.body.mobile }).then(
      store => {
        if (!store) {
          const newStore = new Store(req.body);
          // for (var i = 0; i < req.body.opening.length; i++) {
          //   newStore.opening[i].open = new Date(req.body.opening[i].open);
          //   newStore.opening[i].close = new Date(req.body.opening[i].close);
          // }
          // res.json(newStore);
          newStore
            .save()
            .then(store => res.json(store))
            .catch(err => console.log(err));
        } else {
          json.status(400).json({ message: "duplicated entry" });
        }
      }
    );
  }
);
module.exports = router;
