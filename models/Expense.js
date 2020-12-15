//requirements
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//expenses schema configuration
var expensesSchema = new Schema(
  {
    email: {
      type: String,
    },
    expenseName: {
      type: String,
    },
    expenseType: {
      type: String,
    },
    expenseCompany: {
      type: String,
    },
    expenseAmount: {
      type: Number,
    },
    expenseTerm: {
      type: String,
    },
  },
  { timestamps: true }
);
var Expense = mongoose.model("Expenses", expensesSchema);
module.exports = Expense;
