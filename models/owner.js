// Def: Owner is a crew/non crew person who owns 0 or more resources
// Data details can be found on a trello card named the same name as this file
// this is a schema for how the owner instance will look like in the DB
// you will need mongoose 'mongoDB' to import the schema module
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: [String],
    required: true
  },
  social_media: {
    type: String,
    required: true
  }
});

// name of the database
module.exports = owner = mongoose.model("owner", ownerSchema);
