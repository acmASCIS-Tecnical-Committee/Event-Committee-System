const validator = require("validator");

const isEmpty = require("./is_empty");

const owasp = require("owasp-password-strength-test");

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
});
const result = owasp.test(data.password);
module.exports = function validateRegisterInput(data) {
  let errors = {};
  let name = { min: 6, max: 100 };
  let address = { max: 500 };
  let passwordrule =
    "The password must be at least 10 characters long .must contain at least one uppercase letter , at least one number and at least one special character";

  if (isEmpty(data.name)) {
    errors.name = "Enter your name";
  } else if (validator.isLength(data.name, name)) {
    errors.name = "Your name can contain at least 6 char and at most 100 char";
  }

  if (isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "You must write a valid email";
  }
  if (!result.strong) {
    errors.password = `This password is not strong.${passwordrule}.try again`;
  }
  if (isEmpty(data.password)) {
    errors.password = "Enter a password. try again";
  } else if (isEmpty(data.password2)) {
    errors.password = "Confirm your password. try again";
  } else if (data.password !== data.password2) {
    errors.password2 = "Those passwords didn't match.try again";
  }

  if (!Array.isArray(data.mobile) || data.mobile.length() < 1) {
    errors.mobile = "You have to enter alest one mobile number";
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

  if (!isEmpty(data.address) && validator.isLength(data.address, address)) {
    errors.address = "You can enter maximum 500 char";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
