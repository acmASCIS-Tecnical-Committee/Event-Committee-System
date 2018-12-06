// Def: Material is something that we can buy from a store (example balloons)
// Data details can be found on a trello card named the same name as this file
// this is a schema for how the material instance will look like in the DB
// you will need mongoose 'mongoDB' to import the schema module
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;


const materialSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    notes :{
        type:String,
        required:false
    },
    stores:[{
      //to do fix ref
        store_id:Schema.Types.ObjectId,
        price:Number,
        ref:"store"
    }]
});


module.exports = material = mongoose.model('material',materialSchema);



