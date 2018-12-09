// @Def: User is the data for (Head/Vice/Member) of events committee
// @Name: users
// @Relation: None
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pasword: {
    type: String,
    required: true
  },
  mobile: [
    {
      number: String
    }
  ],
  type: {
    type: String,
    default: "user"
  },
  address: {
    Link: {
      type: String,
      required: true
    },
    Zone: {
      type: String,
      required: true
    }
  }
});

module.exports = user = mongoose.model("users", userSchema);
