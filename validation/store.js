// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

module.exports = function validateStoreInput(data) {
  let errors = {};

  // name general criteria
  let name_criteria = { min: 6, max: 100 };

  // note general criteria
  let notes_criteria = { max: 500 };

  // name: optional, 6:100
  if (!isEmpty(data.name) && !validator.isLength(data.name, name_criteria)) {
    errors.name = "Name must be between 6 and 100 letters";
  }

  // mobile: non empty array
  if (!Array.isArray(data.mobile) || data.mobile.length < 1) {
    errors.mobile = "You must provide at least one number";
  } else {
    // each mobile number must be valid egyptian mobile number
    let subErrors = {};
    for (var i = 0; i < data.mobile.length; i++) {
      if (
        isEmpty(data.mobile[i]) ||
        !validator.isMobilePhone(data.mobile[i], { locale: ["ar-EG"] })
      ) {
        subErrors[i] = "Not a valid egyptian mobile number";
      }
    }
    if (!isEmpty(subErrors)) errors.mobile = subErrors;
  }

  // address.link : Required, valid URL, using https.
  if (
    isEmpty(data.address.link) ||
    !validator.isURL(data.address.link, { protocols: ["https"] })
  ) {
    errors.address.link =
      "You must provide a valid google maps link, it must use https protocol";
  }

  // address.zone : Required, Not empty, max 100
  if (
    isEmpty(data.address.zone) ||
    !validator.isLength(data.address.zone, { max: 100 })
  ) {
    errors.address.zone = "You must provide a valid zone";
  }

  // opening: required, 7 elements
  if (!Array.isArray(data.opening) || data.opening.length != 7) {
    errors.opening = "Please specify the weekly activity of the space";
  } else {
    let subErros = {};
    for (var i = 0; i < 7; i++) {
      // open: required, not empty
      if (isEmpty(data.opening[i].open))
        subErros[i].open = "Specify the opening time";

      // close: required, not empty
      if (isEmpty(data.opening[i].close))
        subErros[i].close = "Specify the closing time";
    }
    if (!isEmpty(subErrors)) errors.opening = subErrors;
  }

  // notes: optional, 500 max
  if (
    !isEmpty(data.room[i].notes) &&
    !validator.isLength(data.notes, notes_critera)
  ) {
    errors.notes = "Maximum 500 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
