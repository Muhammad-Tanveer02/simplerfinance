//requirements
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBillInput(data) {
  let errors = {};

  // Convert empty fields to empty string to allow for validation
  data.billName = !isEmpty(data.billName) ? data.billName : "";
  data.billType = !isEmpty(data.billType) ? data.billType : "";
  data.billInstitution = !isEmpty(data.billInstitution)
    ? data.billInstitution
    : "";
  // data.billAmount = !isEmpty(data.billAmount) ? data.billAmount : "";

  // Bill Name validator
  if (Validator.isEmpty(data.billName)) {
    errors.billName = "Name field is required";
  }
  //Bill Type validator
  if (
    Validator.isEmpty(data.billType) ||
    data.billType === "Select Type here..."
  ) {
    errors.billType = "Type field is required";
  }
  //Bill Institution validator
  if (Validator.isEmpty(data.billInstitution)) {
    errors.billInstitution = "Institution field is required";
  }
  // if (Validator.isEmpty(data.billAmount)) {
  //   errors.billAmount = "This field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
