// @Def: Function to check if the material data is right
// @Name: use validateMaterialInput()
// @Params:
// 1. Data submitted from the material form
// Req: (name, providers)
// @returns
// 1. errors: object contain error in each field, example : email= not a valid email
// 2. isValid: True if it found no errors, False otherwise

// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

module.exports = function validateMaterialInput(data) {
  let errors = {};

  let name = { min: 2, max: 100 };
  let notes = { max: 500 };

  if (isEmpty(data.name)) {
    errors.name = "Enter the material name";
  } else if (validator.isLength(data.name, name)) {
    errors.name = "The name must contain at least 2 char and at most 100 char";
  }

  if (!isEmpty(data.notes) && validator.isLength(data.notes, notes)) {
    errors.notes = "You can enter maximum 500 char";
  }

  if (!Array.isArray(data.stores) || data.stores.length() < 1) {
    errors.stores = "You have to enter at least one store";
  }

  if (isEmpty(data.stores.price)) {
    errors.stores.price = "You must enter the price";
  }
  if (
    validator.isInt(data.stores.price) ||
    validator.isDecimal(data.stores.price)
  ) {
  } else {
    errors.stores.price =
      "Capacity must be filled with integer or decimal value";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
