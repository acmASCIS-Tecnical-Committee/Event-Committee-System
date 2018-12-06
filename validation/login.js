// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

// data is the data submitted by the form, you will find the name of the attributes in the trello card
// you should return every error you got in the errors.field = "message of the error"
// for example errors.name = "Name must have between 6 and 100 characters"


/*
 DESC: 
The login page.

Data will contain:

1. email
2. password

validations:
1. Required, Not empty, valid email.
2. Required, Not empty.

to code use the .js file in the path written in the name of the card.
 */
const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  // your code goes here
  let errors = {};

  if(isEmpty(data.email)||!validator.isEmail(data.email)){
    errors.email='You must write a valid email'
  }

  if(isEmpty(data.password)){
    errors.password='You must provied a password'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
