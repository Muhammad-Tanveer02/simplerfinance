//requirements
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Bill = require("../../models/Bill");
const validateBillInput = require("../../validation/billValid");

//current date of posting
var curDate = new Date();

//GET Route for bills
//Retrieves data by email property of bills schema
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let email = req.user.email; //gets email of current logged in
    Bill.find({ email: email }).then((bills) => res.json(bills)); //returns bills of user logged in
  }
);

//GET Route for bills
//Retrieves bill by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bill.findById(req.params.id)
      .then((bill) => res.json(bill))
      .catch((err) => res.status(400).json("Error:" + err));
  }
);

//POST Route for bills
//Creates new bill
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBillInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newBill = new Bill({
      email: req.body.email,
      billName: req.body.billName,
      billType: req.body.billType,
      billInstitution: req.body.billInstitution,
      billAmount: Number(req.body.billAmount),
      date: Date.parse(req.body.date),
      daysLeft: Number(
        Math.round((Date.parse(req.body.date) - curDate) / 86400000) //86400000ms in one day
      ),
    });

    newBill
      .save()
      .then((bill) => res.json(bill))
      .catch((err) => console.log(err));
  }
);

//DELETE Route for bills
//Finds bill by ID and deletes it
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bill.findById(req.params.id).then((bill) => {
      bill.remove().then(() => res.json({ success: true }));
    });
  }
);

//PATCH Route for bills
//Finds bill by ID and updates its data
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBillInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Bill.findById(req.params.id)
      .then((bill) => {
        bill.billName = req.body.billName;
        bill.billType = req.body.billType;
        bill.billInstitution = req.body.billInstitution;
        bill.billAmount = Number(req.body.billAmount);
        bill.date = Date.parse(req.body.date);
        (bill.daysLeft = Number(
          Math.round((Date.parse(req.body.date) - curDate) / 86400000) //86400000ms in one day
        )),
          bill
            .save()
            .then(() => res.json("Bill added!"))
            .catch((err) => res.status(400).json("Error:" + err));
      })
      .catch((err) => res.status(400).json("Error:" + err));
  }
);

module.exports = router;
