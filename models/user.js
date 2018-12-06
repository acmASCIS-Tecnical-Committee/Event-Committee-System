// Def: User is the data for (Head/Vice/Member) of events committee
// Data details can be found on a trello card named the same name as this file
// this is a schema for how the user instance will look like in the DB
// you will need mongoose 'mongoDB' to import the schema module
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    pasword :{
        type:String,
        required:true
    },
    mobile:[{
        number:String
    }],
    type:{
        type:String,
        default:'user'
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


module.exports = user = mongoose.model('user',userSchema);




