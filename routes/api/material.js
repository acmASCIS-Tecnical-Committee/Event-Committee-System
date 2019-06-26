//TODO in validation -> material can't the same store for one material 


// to use Router
const express = require("express");
// to use get/post requests from it
const router = express.Router();
// to authenticate the private routes
const passport = require("passport");

// load material schema
const Material = require("../../models/material");

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
        newMaterial
          .save()
          .then(materiall => {
            return res.json(materiall);
          })
          .catch(err => console.log(err));
      } else {
        return res
          .status(400)
          .json({ message: "There's already a material with the same name" });
      }
    });
  }
);

// @route POST api/material/all
// @desc load all materials
// @access Private
// @return validate the jwt token

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Material.find()
      .then(materials => {
        if (!materials) {
          errors.nomaterials = "There is no materials ";
          return res.status(404).json(errors);
        }
        res.json(materials);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/material/:material_id
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/:material_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Material.findOneAndRemove({ _id: req.params.material_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ message: "Have error" });
      });
  }
);

// @route   DELETE api/material/:material_id/provider/:provider_id
// @desc    Delete providers
// @access  Private
//"/delete",
router.delete(
  "/:material_id/provider/:provider_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //  Material.findOneAndRemove({ _id: req.body.material_id })
    Material.findOne({ _id: req.params.material_id })
      .then(material => {
        const removeIndeex = material.providers
          .map(item => item.id)
          .indexOf(req.params.provider_id);

        material.providers.splice(removeIndeex, 1);

        material
          .save()
          .then(material => res.status(200).json(material))
          .catch(err => {
            console.log(err);
            res
              .status(404)
              .json({ message: "internal error can't save update " });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ message: "Have error" });
      });
  }
);

// @route GET api/material/:material_id
// @desc get the material data given the material id
// @access Public
// @params material_id: "the required material ID"
// @return:-
// 404 : if there is no such material and {"messsage": the error}
// 200 : if the material is found successfully and all it's data
// reutrn JSON of the requested material => {name:,notes:,providers:}
router.get("/:material_id", (req, res) => {
  Material.findById({ _id: req.params.material_id })
    .then(material => {
      if (material) {
        materialRequested = new Material({
          name: material.name,
          notes: material.notes,
          providers: material.providers
        });
        return res.status(200).json(materialRequested);
      } else
        return res
          .status(404)
          .json({ message: "There's no material with the requested ID" });
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "There's no material with the requested ID" })
    );
});

// @route Post api/material/update/:material_id
// @desc update the current material
// @access Private for any user
// @return status :-
// 400/404 : if there is an error with JSON message: "error message"
// 200 : if the material has been removed with JSON message: "success"

router.post(
  "/update/:material_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //error in validation
    const { errors, isValid } = validateMaterial(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const materialFields = {};
    if (req.body.name) materialFields.name = req.body.name;
    if (req.body.notes) materialFields.notes = req.body.notes;
    if (req.body.providers) materialFields.providers = req.body.providers;

    Material.findOne({ _id: req.params.material_id })
      .then(material => {
        if (material) {
          // if (req.material.id === req.params.material_id) {
          Material.findOneAndUpdate(
            { _id: req.params.material_id },
            { $set: materialFields },
            { new: true }
          )
            .then(material => res.json(material))
            .catch(err => {
              console.log(err);
              res.json({ Eror: "faild to update" });
            });

          // } else
          //   return res.status(400).json({ messgae: "Unauthorized Deletion" });
        } else return res.status(404).json({ message: "material not found" });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
