//requirements
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Income = require("../../models/Income");
const validateIncomeInput = require("../../validation/incomeValid");

//GET Route for income
//Retrieves data by email property of income schema
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let email = req.user.email; //gets email of current logged in
    console.log(email);
    Income.find({ email: email }).then((income) => res.json(income)); //returns income of user logged in
  }
);

//GET Route for income
//Retrieves income by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Income.findById(req.params.id) //mongoose method that gets the exercises from mongoDB database indicated by id
      .then((income) => res.json(income)) //then we return the exercises from the database in JSON format
      .catch((err) => res.status(400).json("Error:" + err)); //if there is an error, return to the user that there are ers
  }
);

//POST Route for income
//Creates new income
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateIncomeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newIncome = new Income({
      email: req.body.email,
      incomeSource: req.body.incomeSource,
      incomeInstitution: req.body.incomeInstitution,
      incomeAmount: Number(req.body.incomeAmount),
      incomeTerm: req.body.incomeTerm,
    });

    newIncome
      .save()
      .then((income) => res.json(income))
      .catch((err) => console.log(err));
  }
);

//DELETE Route for income
//Finds income by ID and deletes it
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Income.findById(req.params.id).then((income) => {
      income.remove().then(() => res.json({ success: true }));
    });
  }
);

//PATCH Route for income
//Finds income by ID and updates its data
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateIncomeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Income.findById(req.params.id)
      .then((income) => {
        income.incomeSource = req.body.incomeSource; //router will request info from user
        income.incomeInstitution = req.body.incomeInstitution; //router will request info from user
        income.incomeAmount = Number(req.body.incomeAmount); //router will request info from user
        income.incomeTerm = req.body.incomeTerm; //router will request info from user
        income
          .save() //mongoose method that gets a list of all the user from mongoDB database
          .then(() => res.json("Income added!")) //then we return the user added from the database in JSON format
          .catch((err) => res.status(400).json("Error:" + err)); //if there is an error, return to the user that there are res
      })
      .catch((err) => res.status(400).json("Error:" + err));
  }
);

module.exports = router;
