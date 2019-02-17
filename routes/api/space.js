//To use Router
const express = require("express");
//To acsses GET && POST Requests from Router
const router = express.Router();
//To acsses space database schema
const Space = require("../../models/space");

//To use Validation unction
const validateResourceInput = require("../../validation/space");

//To test if it work
router.get("/test", (req, res) => {
  console.log("here");
  res.json("space route works");
});

// @route POST api/space/register
// @desc Register new space
// @access Public
// @return status :-
// 400 : if there's error(s), and the errors messages are returned
//       each with prefix describing where the error happened "email: already exists"
// 200 : if the space is registered successfully, and the space data is returned with the password encrypted

router.post("/register", (req, res) => {
  const { errors, isValid } = validateResourceInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    Space.findOne({ name: req.body.name }).then(space => {
      if (space) {
        return res.status(400).json({ name: "This Space already exists" });
      } else {
        const newResource = new Space({
          name: req.body.name,
          email: req.body.email,
          address_link: req.body.address.link,
          address_zone: req.body.address.zone,
          mobile: req.body.mobile,
          rooms_name: req.body.rooms.name,
          rooms_capacity: req.body.rooms.capacity,
          rooms_price: req.body.rooms.price,
          rooms_special_cases: req.body.rooms.special_cases,
          rooms_notes: req.body.rooms.notes,
          notes: req.body.notes,
          connections_name: req.body.connections.name,
          connections_mobile: req.body.connections.mobile,
          connections_notes: req.body.connections.notes,
          opening_open: req.body.opening.open,
          opening_close: req.body.opening.close,
          social_media: req.body.social_media
        });
        //To save new space in database
        newResource
          .save()
          .then(space => res.json(space))
          .catch(err => console.log(err));
      }
    });
  }
});

module.exports = router;
