//To use Router
const express = require("express");
//To acsses GET && POST Requests from Router
const router = express.Router();
//To acsses resource database schema
const Resource = require("../../models/resource");
// to authenticate the private routes
const passport = require("passport");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("../../validation/is_empty");

//To use Validation unction
const validateResourceInput = require("../../validation/resource");

//To test if it work
router.get("/test", (req, res) => {
  res.json("resource route works");
});

// @route POST api/resource/register
// @desc Register new resource
// @access Public
// @return status :-
// 400 : if there's error(s), and the errors messages are returned
//       each with prefix describing where the error happened "email: already exists"
// 200 : if the resource is registered successfully, and the resource data is returned with the password encrypted

router.post("/register", (req, res) => {
  const { errors, isValid } = validateResourceInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    Resource.findOne({ name: req.body.name }).then(resource => {
      if (resource) {
        return res.status(400).json({ name: "This Resource already exists" });
      } else {
        const newResource = new Resource({
          name: req.body.name,
          details: req.body.details,
          feedback: req.body.feedback,
          userId: req.body.userId,
          owner: req.body.owner
        });
        //To save new resource in database
        newResource
          .save()
          .then(
            resource => res.status(200).json(resource)
            // res.status(200).json({ message: "Successfully Registered" })
          )
          .catch(err => {
            console.log(err);
            res.status(404).json({ message: "There's an error in this data" });
          });
      }
    });
  }
});

// @route POST api/resource/all
// @desc load all resources
// @access Private
// @return validate the jwt token

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Resource.find()
      .then(resources => {
        if (!resources) {
          errors.noresources = "There is no resources ";
          return res.status(404).json(errors);
        } else if (isEmpty(resources)) {
          errors.noresources = "There is no resources saved in the system";
          return res.status(404).json(errors);
        }
        res.json(resources);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/resource/delete
// @desc    Delete user and profile
// @access  Private
//"/delete",
router.delete(
  "/:resource_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //  Resource.findOneAndRemove({ _id: req.body.resource_id })
    Resource.findOneAndRemove({ _id: req.params.resource_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ message: "Have error" }));
  }
);

// @route GET api/resource/:resource_id
// @desc get the resource data given the resource id
// @access Public
// @params resource_id: "the required resource ID"
// @return:-
// 404 : if there is no such resource and {"messsage": the error}
// 200 : if the resource is found successfully and all it's data
// reutrn JSON of the requested resource => {name:,details:,feedback:,userId:,owner:}
router.get("/:resource_id", (req, res) => {
  Resource.findById({ _id: req.params.resource_id })
    .then(resource => {
      if (resource) {
        resourceRequested = new Resource({
          name: resource.name,
          details: resource.details,
          feedback: resource.feedback,
          userId: resource.userId,
          owner: resource.owner
        });
        return res.status(200).json(resourceRequested);
      } else
        return res
          .status(404)
          .json({ message: "There's no resource with the requested ID" });
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "There's no resource with the requested ID" })
    );
});




// @route Post api/resource/update/:resource_id
// @desc update the current resource
// @access Private for any user
// @return status :-
// 400/404 : if there is an error with JSON message: "error message"
// 200 : if the resource has been removed with JSON message: "success"

router.post(
  "/update/:resource_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //error in validation
    const { errors, isValid } = validateResourceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const resourceFields = {};
    if (req.body.name) resourceFields.name = req.body.name;
    if (req.body.details) resourceFields.details = req.body.details;
    if (req.body.feedback) resourceFields.feedback = req.body.feedback;
    if (req.body.userId) resourceFields.userId = req.body.userId;
    if (req.body.owner) resourceFields.owner = req.body.owner;
    
    Resource.findOne({ _id:req.params.resource_id })
      .then(resource => {
        if (resource) {
          // if (req.resource.id === req.params.resource_id) {
          Resource.findOneAndUpdate(
            { _id: req.params.resource_id },
            { $set: resourceFields },
            { new: true }
          )
            .then(resource => res.json(resource))
            .catch(err => {
              console.log(err);
              res.json({ Eror: "faild to update" });
            });

          // } else
          //   return res.status(400).json({ messgae: "Unauthorized Deletion" });
        } else return res.status(404).json({ message: "Resource not found" });
      })
      .catch(err => console.log(err));
  }
);



module.exports = router;
