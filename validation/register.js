//requirements
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to empty string to allow for validation
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "This is not a valid Email.";
  }

  // Password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Passowrd field is required.";
  }
  // Confirm Password check
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Please re-enter your password.";
  }
  // Password length check
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password too short, it must at least 8 characters.";
  }
  //Password match check
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "These passwords don't match.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
