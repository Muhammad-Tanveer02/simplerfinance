//requirements
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateIncomeInput(data) {
  let errors = {};

  // Convert empty fields to empty string to allow for validation
  data.incomeSource = !isEmpty(data.incomeSource) ? data.incomeSource : "";
  data.incomeInstitution = !isEmpty(data.incomeInstitution)
    ? data.incomeInstitution
    : "";
  data.incomeTerm = !isEmpty(data.incomeTerm) ? data.incomeTerm : "";
  // data.incomeAmount = !isEmpty(data.incomeAmount) ? data.incomeAmount : "";

  // Income Source check
  if (
    Validator.isEmpty(data.incomeSource) ||
    data.incomeSource === "Select Source here..."
  ) {
    errors.incomeSource = "Source field is required";
  }
  // Income Institution check
  if (Validator.isEmpty(data.incomeInstitution)) {
    errors.incomeInstitution = "Institution field is required";
  }
  // if (Validator.isEmpty(data.incomeAmount)) {
  //   errors.incomeAmount = "This field is required";
  // }
  // Income Term check
  if (
    Validator.isEmpty(data.incomeTerm) ||
    data.incomeTerm === "Select Type here..."
  ) {
    errors.incomeTerm = "Term field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
