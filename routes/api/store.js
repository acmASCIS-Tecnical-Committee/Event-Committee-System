const express = require("express");
const router = express.Router();

// load store schema
const Store = require("../../models/store");

router.get("/test", (req, res) => {
  console.log(Store.schema.tree);
  res.json("Testing store page");
});

module.exports = router;
