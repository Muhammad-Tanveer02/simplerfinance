//requirements
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//income schema configuration
var incomeSchema = new Schema(
  {
    email: {
      type: String,
    },
    incomeSource: {
      type: String,
    },
    incomeInstitution: {
      type: String,
    },
    incomeAmount: {
      type: Number,
    },
    incomeTerm: {
      type: String,
    },
  },
  { timestamps: true }
);
var Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
