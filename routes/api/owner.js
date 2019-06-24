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

// // @route GET api/resource/:resource_id
// // @desc get the resource data given the resource id
// // @access Public
// // @params resource_id: "the required resource ID"
// // @return:-
// // 404 : if there is no such resource and {"messsage": the error}
// // 200 : if the resource is found successfully and all it's data
// // reutrn JSON of the requested resource => {name:,email:,notes:,address:,mobile:,opening:}
// router.get("/:resource_id", (req, res) => {
//   Resource.findById({ _id: req.params.resource_id })
//     .then(resource => {
//       if (resource) {
//         resourceRequested = new Resource({
//           name: resource.name,
//           email:resource.email,
//           address: resource.address, 
//           opening: resource.opening,
//           mobile:resource.mobile,
//           rooms:resource.rooms,
//           notes: resource.notes,
//           connections:resource.connections,
//           opening:resource.opening,
//           social_media:resource.social_media
//         });
//         return res.status(200).json(resourceRequested);
//       } else
//         return res
//           .status(404)
//           .json({ message: "There's no resource with the requested ID" });
//     })
//     .catch(err =>
//       res.status(404).json({ message: "There's no resource with the requested ID" })
//     );
// });



module.exports = router;
