//To use Router
const express = require("express");
//To acsses GET && POST Requests from Router
const router = express.Router();
//To acsses Owner database schema
const Owner = require("../../models/owner");
// to authenticate the private routes
const passport = require("passport");

//To use Validation unction
const validateOwnerInput = require("../../validation/owner");

//To test if it work
router.get("/test", (req, res) => {
  res.json("Owner route works");
});

// @route POST api/owner/register
// @desc Register new owner
// @access Public
// @return status :-
// 400 : if there's error(s), and the errors messages are returned
//       each with prefix describing where the error happened "email: already exists"
// 200 : if the owner is registered successfully, and the owner data is returned with the password encrypted

router.post("/register", (req, res) => {
  const { errors, isValid } = validateOwnerInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    Owner.findOne({ email: req.body.email }).then(owner => {
      if (owner) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newOwner = new Owner({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          social_media: req.body.social_media
        });
        //To save new owner in database
        newOwner
          .save()
          .then(owner => res.json(owner))
          .catch(err => console.log(err));
      }
    });
  }
});

// @route POST api/owner/all
// @desc load all owners
// @access Private
// @return validate the jwt token

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Owner.find()
      .then(owners => {
        if (!owners) {
          errors.nostores = "There is no owners ";
          return res.status(404).json(errors);
        }
        res.json(owners);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/owner/delete
// @desc    Delete user and profile
// @access  Private
//"/delete",
router.delete(
  "/:owner_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Owner.findOneAndRemove({ _id: req.body.owner_id })
    Owner.findOneAndRemove({ _id: req.params.owner_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ message: "Have error   " + err });
      });
  }
);

// @route GET api/owner/:owner_id
// @desc get the owner data given the owner id
// @access Public
// @params owner_id: "the required owner ID"
// @return:-
// 404 : if there is no such owner and {"messsage": the error}
// 200 : if the owner is found successfully and all it's data
// reutrn JSON of the requested owner => {name:,email:,mobile:,social_media:}
router.get("/:owner_id", (req, res) => {
  Owner.findById({ _id: req.params.owner_id })
    .then(owner => {
      if (owner) {
        ownerRequested = new Owner({
          name: owner.name,
          email: owner.email,
          mobile: owner.mobile,
          social_media: owner.social_media
        });
        return res.status(200).json(ownerRequested);
      } else
        return res
          .status(404)
          .json({ message: "There's no owner with the requested ID" });
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "There's no owner with the requested ID" })
    );
});





// @route Post api/owner/update/:owner_id
// @desc update the current owner
// @access Private for any user
// @return status :-
// 400/404 : if there is an error with JSON message: "error message"
// 200 : if the owner has been removed with JSON message: "success"

router.post(
  "/update/:owner_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //error in validation
    const { errors, isValid } = validateOwnerInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const ownerFields = {};
    if (req.body.name) ownerFields.name = req.body.name;
    if (req.body.email) ownerFields.email = req.body.email;
    if (req.body.mobile) ownerFields.mobile = req.body.mobile;
    if (req.body.social_media) ownerFields.social_media = req.body.social_media;

    Owner.findOne({ _id:req.params.owner_id })
      .then(owner => {
        if (owner) {
          // if (req.owner.id === req.params.owner_id) {
          Owner.findOneAndUpdate(
            { _id: req.params.owner_id },
            { $set: ownerFields },
            { new: true }
          )
            .then(owner => res.json(owner))
            .catch(err => {
              console.log(err);
              res.json({ Eror: "faild to update" });
            });

          // } else
          //   return res.status(400).json({ messgae: "Unauthorized Deletion" });
        } else return res.status(404).json({ message: "Owner not found" });
      })
      .catch(err => console.log(err));
  }
);





module.exports = router;
