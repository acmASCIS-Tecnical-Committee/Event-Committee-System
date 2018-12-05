// to use some built in validators
const validator = require("validator");
// now you can use isEmpty(anything) to check if it's empty or not
const isEmpty = require("./is_empty");

module.exports = function validateSpaceInput(data) {
  let errors = {};
  // Fixed name criteria
  let name_criteria = { min: 6, max: 100 };

  // Fixed notes criteria
  let notes_critera = { min: 0, max: 500 };

  // Name: Required, Not empty, between 6 and 100.
  if (!validator.isLength(data.name, name_criteria)) {
    errors.name = "Name length should be between 6 and 10 characters";
  }

  // email: Optional, valid email.
  if (!isEmpty(data.email) && !validator.isEmail(data.email)) {
    errors.email = "This email is not valid";
  }

  // address.link : Required, Not empty,max 300.
  if (!validator.isURL(data.address.link, { protocols: ["https"] })) {
    errors.address.link =
      "Provide a valid google maps link it must be using https protocol";
  }

  // address.zone : Required, Not empty, max 100
  if (!validator.isLength(data.address.link, { min: 1, max: 100 })) {
    errors.address.zone = "Provide a valid zone";
  }

  // mobile: non empty array
  if (!Array.isArray(data.mobile)) {
    errors.mobile = "Provide at least one number";
  } else {
    // each mobile number must be valid egyptian mobile number
    let subErrors = {};
    for (var i = 0; i < data.mobile.length; i++) {
      if (!validator.isMobilePhone(data.mobile[i], { locale: ["ar-EG"] })) {
        subErrors[i] = "Not a valid egyptian mobile number";
      }
    }
    if (!isEmpty(subErrors)) errors.mobile = subErrors;
  }

  // rooms: non empty array
  if (!Array.isArray(data.rooms)) {
    errors.rooms = "Fill at least one room data";
  } else {
    // each room must have capacity and a price and name, others has max 500 chars
    let subErrors = {};
    for (var i = 0; i < data.rooms.length; i++) {
      // capacity: required, integer
      if (
        isEmpty(data.rooms[i].capacity) ||
        !validator.isInt(data.rooms[i].capacity)
      ) {
        subError[i].capacity = "Capacity must be filled with integer value";
      }

      // price: required, integer
      if (
        isEmpty(data.rooms[i].price) ||
        !validator.isInt(data.rooms[i].price)
      ) {
        subError[i].price = "Price must be filled with integer value";
      }

      // name: required, 6:100
      if (
        isEmpty(data.rooms[i].name) ||
        !validator.isLength(data.rooms[i].name, name_criteria)
      ) {
        subError[i].name = "Name must be between 6 and 100 characters";
      }

      // special_cases: optional, max 500 chars
      if (isLength(data.rooms[i].special_cases, notes_criteria)) {
        subError[i].special_cases = "Maximum 500 characters";
      }

      // notes: optional, max 500 chars
      if (isLength(data.rooms[i].notes, notes_criteria)) {
        subError[i].notes = "Maximum 500 characters";
      }
    }
    if (!isEmpty(subErrors)) errors.rooms = subErrors;
  }

  // notes: optional, 500 max
  if (!validator.isLength(data.notes, notes_critera)) {
    errors.notes = "Maximum 500 characters";
  }

  // connections : optional
  if (Array.isArray(data.connections)) {
    let subErrors = {};
    for (var i = 0; i < data.connections.length; i++) {
      // mobile: required, valid Ar-EG
      if (
        isEmpty(data.connections[i].mobile) ||
        !validator.isMobilePhone(data.connections[i].mobile, {
          locale: ["Ar-EG"]
        })
      ) {
        subErrors[i].mobile = "Provide a valid egyptian mobile number";
      }

      // name: required, 6:100
      if (!validator.isLength(data.connections[i].name, name_criteria)) {
        subErrors[i].name = "Name must be between 6 and 100 letters";
      }

      // notes: optional, 500 max
      if (
        !isEmpty(
          data.connections[i].notes &&
            !validator.isLength(data.connections[i].notes, notes_criteria)
        )
      ) {
        subError[i].notes = "Maximum 500 letter";
      }
    }
    if (!isEmpty(subErrors)) errors.connections = subErrors;
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

  // social_media: required, URL
  if (!isEmpty(data.social_media) || !validator.isURL(data.social_media)) {
    errors.social_media = "Enter a valid facebook URL";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
