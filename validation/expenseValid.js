//requirements
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExpenseInput(data) {
  let errors = {};

  // Convert empty fields to empty string to allow for validation
  data.expenseName = !isEmpty(data.expenseName) ? data.expenseName : "";
  data.expenseType = !isEmpty(data.expenseType) ? data.expenseType : "";
  data.expenseCompany = !isEmpty(data.expenseCompany)
    ? data.expenseCompany
    : "";
  data.expenseTerm = !isEmpty(data.expenseTerm) ? data.expenseTerm : "";
  // data.expenseAmount = !isEmpty(data.expenseAmount) ? data.expenseAmount : "";

  // Expense Name check
  if (Validator.isEmpty(data.expenseName)) {
    errors.expenseName = "Name field is required";
  }
  // Expense Type check
  if (
    Validator.isEmpty(data.expenseType) ||
    data.expenseType === "Select Type here..."
  ) {
    errors.expenseType = "Type field is required";
  }
  // Expense Company check
  if (Validator.isEmpty(data.expenseCompany)) {
    errors.expenseCompany = "Company field is required";
  }
  // if (Validator.isEmpty(data.expenseAmount)) {
  //   errors.expenseAmount = "This field is required";
  // }
  // Expense Term check
  if (
    Validator.isEmpty(data.expenseTerm) ||
    data.expenseTerm === "Select Type here..."
  ) {
    errors.expenseTerm = "Term field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
