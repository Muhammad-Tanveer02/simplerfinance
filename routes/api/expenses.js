//requirements
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Expense = require("../../models/Expense");
const validateExpenseInput = require("../../validation/expenseValid");

//GET Route for expenses
//Retrieves data by email property of expenses schema
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let email = req.user.email; //gets email of current logged in
    Expense.find({ email: email }).then((expenses) => res.json(expenses)); //returns expenses of user logged in
  }
);

//GET Route for expenses
//Retrieves expense by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.findById(req.params.id)
      .then((expense) => res.json(expense))
      .catch((err) => res.status(400).json("Error:" + err));
  }
);

//POST Route for expenses
//Creates new expense
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpenseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newExpense = new Expense({
      email: req.body.email,
      expenseName: req.body.expenseName,
      expenseType: req.body.expenseType,
      expenseCompany: req.body.expenseCompany,
      expenseAmount: Number(req.body.expenseAmount),
      expenseTerm: req.body.expenseTerm,
    });

    newExpense
      .save()
      .then((expense) => res.json(expense))
      .catch((err) => console.log(err));
  }
);

//DELETE Route for expenses
//Finds expense by ID and deletes it
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.findById(req.params.id).then((expense) => {
      expense.remove().then(() => res.json({ success: true }));
    });
  }
);

//PATCH Route for expenses
//Finds expense by ID and updates its data
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpenseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Expense.findById(req.params.id)
      .then((expense) => {
        expense.expenseName = req.body.expenseName;
        expense.expenseType = req.body.expenseType;
        expense.expenseCompany = req.body.expenseCompany;
        expense.expenseAmount = Number(req.body.expenseAmount);
        expense.expenseTerm = req.body.expenseTerm;
        expense
          .save()
          .then(() => res.json("Expense added!"))
          .catch((err) => res.status(400).json("Error:" + err));
      })
      .catch((err) => res.status(400).json("Error:" + err));
  }
);

module.exports = router;
