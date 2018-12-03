// Def: Store is a place where we can buy one or more material
// Data details can be found on a trello card named the same name as this file
// this is a schema for how the store instance will look like in the DB
// you will need mongoose 'mongoDB' to import the schema module
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
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

module.exports = User = mongoose.model("store", StoreSchema);
