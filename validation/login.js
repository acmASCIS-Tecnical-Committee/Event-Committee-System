// @Def: Function to check if the login data is right
// @Name: use validateLoginInput()
// @Params:
// 1. Data submitted from the login form
// Req: (email, password)
// @returns
// 1. errors: object contain error in each field, example : email= not a valid email
// 2. isValid: True if it found no errors, False otherwise

// Expected bugs: Maybe you would need to assign "" to any row of data that isEmpty() = true

// for some built in validator functions
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not since we don't trust validator.isEmpty
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "You must write a valid email";
  }

  if (isEmpty(data.password)) {
    errors.password = "You must provied a password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
