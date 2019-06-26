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

// load material schema
const Material = require("../../models/material");

// @route GET api/store/test
// @desc Test the route
// @access public
// @return message if working
router.get("/test", (req, res) => {
  res.json("Testing store page");
});

// @route POST api/store/register
// @desc add a new store to the database
// @access private (logged in users only)
// @return success: {message} if succeded
// @terminal log errors if there's internal error in server
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
          newStore
            .save()
            .then(store =>
              res.json({ success: "Successfully added to the database" })
            )
            .catch(err => console.log(err));
        } else {
          json.status(400).json({ message: "Duplicated entry" });
        }
      }
    );
  }
);

// @route POST api/store/all
// @desc load all stores
// @access Private
// @return validate the jwt token

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Store.find()
      .then(stores => {
        if (!stores) {
          errors.nostores = "There is no stores ";
          return res.status(404).json(errors);
        }
        res.json(stores);
      })
      .catch(err => res.status(404).json(err));
  }
);





// @route   DELETE api/store/delete
// @desc    Delete store
// @access  Private
//"/delete",
router.delete(
  "/:store_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("111111111111111111111");
    //  store.findOneAndRemove({ _id: req.body.store_id })
    Store.findOneAndRemove({ _id: req.params.store_id })
      .then(() => {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR");
        Material.find().then(materials => {
          if (!materials) {
            console.log("nooooooooooooooooooooooooMMMMMMMM");
            res.json({ success: "true" });
          } else {
            materials.forEach(material => {
              console.log("Maaaaaaaaaaaaaaaatttt");
                let providers=material.providers;
            providers.forEach(provider =>{
              console.log("Prooooooooooooooooooooooooovi  " + provider );
              if(provider.store_id == req.params.store_id){
                console.log("YYYYYYYYYYYYyy");
                  const removeIndeex = material.providers
                            .map(item => item.id)
                            .indexOf(provider._id);
          
                          material.providers.splice(removeIndeex, 1);
          
                          material
                            .save()
                            .then(material => console.log(material))
                            .catch(err => {
                              console.log(err);
                              res
                                .status(404)
                                .json({ message: "internal error can't save update " });
                            });
              }
            });

          });
          
                       
          }
        });
        return res.status(200).json({ message: "Done" })
      })
      .catch(err => res.status(404).json({ message: "Have error" }));
  }
);



// router.delete(
//   "/tttt/:store_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};
//     Material.providers
//       .find({ store_id: req.params.store_id })
//       .then(providerss => {
//         providerss
//           .delete()
//           .then(res.json({ message: "++++++++++" }))
//           .catch(err => {
//             console.log("------------   " + err);
//             res.json({ message: "-----------------------" });
//           });

//         providerss
//           .save()
//           .then(pro => res.status(200).json(pro))
//           .catch(err => {
//             console.log(err);
//             res
//               .status(404)
//               .json({ message: "internal error can't save update " });
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.json({ message: "Balah" });
//       });

//     // Material.find()
//     //   .then(materials => {
//     //     if (!materials) {
//     //       errors.nomaterials = "There is no materials ";
//     //       return res.status(404).json(errors);
//     //     }
//     //     res.json(materials);
//     //   })
//     //   .catch(err => res.status(404).json(err));
//   }
// );

// @route GET api/store/:store_id
// @desc get the store data given the store id
// @access Public
// @params store_id: "the required store ID"
// @return:-
// 404 : if there is no such store and {"messsage": the error}
// 200 : if the store is found successfully and all it's data
// reutrn JSON of the requested store => {name:,notes:,address:,mobile:,opening:}
router.get("/:store_id", (req, res) => {
  Store.findById({ _id: req.params.store_id })
    .then(store => {
      if (store) {
        storeRequested = new Store({
          name: store.name,
          address: store.address,
          opening: store.opening,
          mobile: store.mobile,
          notes: store.notes
        });
        return res.status(200).json(storeRequested);
      } else
        return res
          .status(404)
          .json({ message: "There's no store with the requested ID" });
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "There's no store with the requested ID" })
    );
});

// @route Post api/store/update/:store_id
// @desc update the current store
// @access Private for any user
// @return status :-
// 400/404 : if there is an error with JSON message: "error message"
// 200 : if the store has been removed with JSON message: "success"

router.post(
  "/update/:store_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //error in validation
    const { errors, isValid } = validateStore(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const storeFields = {};
    if (req.body.name) storeFields.name = req.body.name;
    if (req.body.address) storeFields.address = req.body.address;
    if (req.body.opening) storeFields.opening = req.body.opening;
    if (req.body.notes) storeFields.notes = req.body.notes;
    if (req.body.mobile) storeFields.mobile = req.body.mobile;
    storeFields.updated = Date.now();
    Store.findOne({ _id: req.params.store_id })
      .then(store => {
        if (store) {
          // if (req.store.id === req.params.store_id) {
          Store.findOneAndUpdate(
            { _id: req.params.store_id },
            { $set: storeFields },
            { new: true }
          )
            .then(store => res.json(store))
            .catch(err => {
              console.log(err);
              res.json({ Eror: "faild to update" });
            });

          // } else
          //   return res.status(400).json({ messgae: "Unauthorized Deletion" });
        } else return res.status(404).json({ message: "Store not found" });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
