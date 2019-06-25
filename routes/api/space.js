//To use Router
const express = require("express");
//To acsses GET && POST Requests from Router
const router = express.Router();
//To acsses space database schema
const Space = require("../../models/space");
// to authenticate the private routes
const passport = require("passport");


//test
// built in function to check on empty objects
const isEmpty = require("../../validation/is_empty");


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
        for (var i = 0; i < 7; i++) {
          req.body.opening[i].open = Date(req.body.opening[i].open);
          req.body.opening[i].close = Date(req.body.opening[i].close);
        }
        const newSpace = new Space(req.body);

        //To save new space in database

        newSpace
          .save()
          .then(space => res.json(space))
          .catch(err => console.log(err));
      }
    });
  }
});

// @route POST api/space/all
// @desc load all spaces
// @access Private
// @return validate the jwt token

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Space.find()
      .then(spaces => {
        if (!spaces) {
          errors.nospaces = "There is no spaces ";
          return res.status(404).json(errors);
        }
        res.json(spaces);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/space/delete
// @desc    Delete space
// @access  Private
//"/delete",
router.delete(
  "/:space_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //  space.findOneAndRemove({ _id: req.body.space_id })
    Space.findOneAndRemove({ _id: req.params.space_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ message: "Have error" }));
  }
);

// @route GET api/space/:space_id
// @desc get the space data given the space id
// @access Public
// @params space_id: "the required space ID"
// @return:-
// 404 : if there is no such space and {"messsage": the error}
// 200 : if the space is found successfully and all it's data
// reutrn JSON of the requested space => {name:,email:,notes:,address:,mobile:,opening:,rooms:,connections:,social_media:}
router.get("/:space_id", (req, res) => {

//for test ****************************************************
  // if(isEmpty(req.body.pp) )
  //   console.log( typeof(req.body.pp)+"   empty");
  // else 
  //   console.log( typeof(req.body.pp)+"  not empty");

  //       *****************************************************

  Space.findById({ _id: req.params.space_id })
    .then(space => {
      if (space) {
        spaceRequested = new Space({
          name: space.name,
          email: space.email,
          address: space.address,
          opening: space.opening,
          mobile: space.mobile,
          rooms: space.rooms,
          notes: space.notes,
          connections: space.connections,
          social_media: space.social_media
        });
        return res.status(200).json(spaceRequested);
      } else
        return res
          .status(404)
          .json({ message: "There's no space with the requested ID" });
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "There's no space with the requested ID" })
    );
});

module.exports = router;
