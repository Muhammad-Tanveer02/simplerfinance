//requirements
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap";

class ExpensesDisplay extends Component {
  constructor(props) {
    super(props);

    this.expenseDisplay = this.expenseDisplay.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
      expenses: [],
      thirtyExpenseTotal: 0,
      yearlyExpenseTotal: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/expenses/")
      .then((response) => {
        this.setState({ expenses: response.data });
        var i;
        var thirtyDayTotal = 0; //total income payment for the next 30 day period
        var yearlyTotal = 0; //total income payment for the next annual period
        var thirtyFactor = 0;
        var yearlyFactor = 0;
        for (i = 0; i < response.data.length; i++) {
          if (this.state.expenses[i].expenseTerm === "One-Time") {
            thirtyFactor = 1;
            yearlyFactor = 1;
          } else if (this.state.expenses[i].expenseTerm === "Hourly") {
            thirtyFactor = 720; //720 hours in 30 days
            yearlyFactor = 8760; //8760 hours in a year
          } else if (this.state.expenses[i].expenseTerm === "Daily") {
            thirtyFactor = 30; //30 days
            yearlyFactor = 365; //365 days
          } else if (this.state.expenses[i].expenseTerm === "Weekly") {
            thirtyFactor = 4; //4 weeks in 30 days
            yearlyFactor = 52; //52 weeks in a year
          } else if (this.state.expenses[i].expenseTerm === "Bi-Weekly") {
            thirtyFactor = 2; //2 bi-weeks in 30 days
            yearlyFactor = 26; //26 bi-weeks in a year
          } else if (this.state.expenses[i].expenseTerm === "Monthly") {
            thirtyFactor = 1; //1 month in 30 days
            yearlyFactor = 12; //12 months in a year
          } else if (this.state.expenses[i].expenseTerm === "Semi-Anually") {
            thirtyFactor = 0;
            yearlyFactor = 2; //2 semi-annual payments in a year
          } else if (this.state.expenses[i].expenseTerm === "Anually") {
            thirtyFactor = 0;
            yearlyFactor = 1; //12 months in a year
          } else {
            thirtyFactor = 0; //only shows for 30 days, other terms are excluded
            yearlyFactor = 0; //only shows for 30 days, other terms are excluded
          }

          thirtyDayTotal +=
            Number(this.state.expenses[i].expenseAmount) * thirtyFactor;
          yearlyTotal +=
            Number(this.state.expenses[i].expenseAmount) * yearlyFactor;
        } //calculates total of all bills displayed
        this.setState({ thirtyExpenseTotal: thirtyDayTotal });
        this.setState({ yearlyExpenseTotal: yearlyTotal });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExpense(expenseId) {
    axios
      .delete("https://simpler-finance-tanveer.herokuapp.com/api/expenses/delete/" + expenseId)
    this.setState({
      expenses: this.state.expenses.filter((el) => el._id !== expenseId),
    });
    
    document.getElementById('update-text').innerHTML='Please refresh to update totals.';//appear once user deletes an item

  }

  expenseDisplay() {
    return this.state.expenses.map((currentExpense) => {
      return (
        <Expenses
          expense={currentExpense}
          deleteExpense={this.deleteExpense}
          thirtyDayTotal={this.state.thirtyExpenseTotal}
          yearlyTotal={this.state.yearlyExpenseTotal}
          key={currentExpense._id}
        />
      );
    });
  }

  render(props) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <h3 className="text-center">Your Current Expenses</h3>
            <div className="jumbotron jumbotron-expense">
              <div className = "expense-text">
                <h1 className="display-4 text-center">
                  $ {(this.state.thirtyExpenseTotal).toLocaleString(undefined, {maximumFractionDigits:2})}
                </h1>
                <h2 className="lead text-center">
                  are your Total Expenses (next 30 days).
                </h2>
                <h1 className="display-4 text-center">
                  $ {(this.state.yearlyExpenseTotal).toLocaleString(undefined, {maximumFractionDigits:2})}
                </h1>
                <h2 className="lead text-center">
                  are your Total Expenses (next year).
                </h2>
              </div>
            </div>
            <div id="update-text" className="update-text"></div>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th class="align-middle">Name of Expense</th>
                  <th>Type of Expense</th>
                  <th>Company Owed</th>
                  <th>Amount Due ($)</th>
                  <th>Payment Term</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.expenseDisplay()}</tbody>
            </table>
            <p>
              <a
                href="/expenses/add"
                type="button"
                class="btn btn-warning btn-lg btn-block"
              >
                {" "}
                Add New Expense
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const Expenses = (props) => (
  <tr>
    <td className="text-center">{props.expense.expenseName}</td>
    <td className="text-center">{props.expense.expenseType}</td>
    <td className="text-center">{props.expense.expenseCompany}</td>
    <td className="text-center">{"$ " + (props.expense.expenseAmount).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
    <td className="text-center">{props.expense.expenseTerm}</td>
    <td>
      <Link
        to={"/expenses/update/" + props.expense._id}
        type="button"
        className="btn btn-primary btn-center"
      >
        Update
      </Link>{" "}
      <p>
        <a
          href="/expenses"
          type="button"
          className="btn btn-danger btn-center"
          onClick={() => {
            props.deleteExpense(props.expense._id);
          }}
        >
          {" "}
          Delete
        </a>
      </p>
    </td>
  </tr>
);

ExpensesDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withRouter(ExpensesDisplay));
