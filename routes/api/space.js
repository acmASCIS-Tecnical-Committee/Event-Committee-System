//To use Router
const express = require("express");
//To acsses GET && POST Requests from Router
const router = express.Router();
//To acsses space database schema
const Space = require("../../models/space");

//To use Validation unction
const validateSpaceInput = require("../../validation/space");

//To test if it work
router.get("/test", (req, res) => {
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
  const { errors, isValid } = validateSpaceInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    Space.findOne({ name: req.body.name }).then(space => {
      if (space) {
        return res.status(400).json({ name: "This Space already exists" });
      } else {
        const newSpace = new Space({
          name: req.body.name,
          email: req.body.email,

          address: {
            link: req.body.address.link,
            zone: req.body.address.zone
          },

          mobile: req.body.mobile,

          rooms: {
            name: req.body.rooms[0].name,
            capacity: req.body.rooms[0].capacity,
            price: req.body.rooms[0].price,
            special_cases: req.body.rooms[0].special_cases,
            notes: req.body.rooms[0].notes
          },
          notes: req.body.notes,

          // connections: {
          //   name: req.body.connections.name,
          //   mobile: req.body.connections.mobile,
          //   notes: req.body.connections.notes
          // },

          connections: {
            // req.body.connections,
            name: req.body.connections[0].name,
            mobile: req.body.connections[0].mobile,
            notes: req.body.connections[0].notes //,
          },
          //req.body.opening,
          opening: {
            open: req.body.opening[0].open,
            close: req.body.opening[0].close //,
          },

          //opening: req.body.opening,
          social_media: req.body.social_media
        });

        //To save new space in database

        newSpace
          .save()
          .then(space => res.json(space))
          .catch(err => console.log(err));
      }
    });
  }
});

module.exports = router;
