//requirements
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//bills schema configuration
var billsSchema = new Schema(
  {
    email: {
      type: String,
    },
    billName: {
      type: String,
    },
    billType: {
      type: String,
    },
    billInstitution: {
      type: String,
    },
    billAmount: {
      type: Number,
    },
    date: {
      type: Date,
    },
    daysLeft: {
      type: Number,
    },
  },
  { timestamps: true }
);
var Bill = mongoose.model("Bills", billsSchema);
module.exports = Bill;
