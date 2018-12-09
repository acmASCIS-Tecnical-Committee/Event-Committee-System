// @Def: Resource is something that acmASCIS owns that's left with someone (Owner)
// @Name: resources
// @Relation: each resource have one owner
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: {
    // should be unique, in case of duplications concatenate an id to the name
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  details: {
    type: String,
    required: false
  },
  owner: {
    // ID refrences to "owners database"
    type: Schema.Types.ObjectId,
    ref: "owners"
  }
});

module.exports = resource = mongoose.model("resources", resourceSchema);
