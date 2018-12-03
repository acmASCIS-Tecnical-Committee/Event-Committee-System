// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

// data is the data submitted by the form, you will find the name of the attributes in the trello card
// you should return every error you got in the errors.field = "message of the error"
// for example errors.name = "Name must have between 6 and 100 characters"
module.exports = function validateLoginInput(data) {
  // your code goes here
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
