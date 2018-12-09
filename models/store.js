// @Def: Store is a place where we can buy one or more material
// @Name: stores
// @Relation: many to many relation with materials, so materials refrence here
// --> many stores can provide the same material, many materials could be provided by the same store
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  address: {
    Link: {
      type: String,
      required: true
    },
    Zone: {
      type: String,
      required: true
    }
  },
  opening: {
    type: [
      {
        open: {
          type: Date,
          required: true
        },
        close: {
          type: Date,
          required: true
        }
      }
    ],
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  mobile: {
    type: [String],
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("stores", storeSchema);
