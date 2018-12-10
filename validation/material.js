// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

module.exports = function validateMaterialInput(data) {
  let errors = {};

  let name = { min: 6, max: 100 };
  let notes = { max: 500 };

  if (isEmpty(data.name)) {
    errors.name = "Enter your name";
  } else if (validator.isLength(data.name, name)) {
    errors.name = "Your name can contain at least 6 char and at most 100 char";
  }

  if (!isEmpty(data.notes) && validator.isLength(data.notes, notes)) {
    errors.notes = "You can enter maximum 500 char";
  }

  if (!Array.isArray(data.stores) || data.stores.length() < 1) {
    errors.stores = "You have to enter alest one store";
  }

  if (isEmpty(data.stores.price)) {
    errors.stores.price = "Enter the price";
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
