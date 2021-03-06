//requirements
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap";

class IncomeDisplay extends Component {
  constructor(props) {
    super(props);

    this.incomeDisplay = this.incomeDisplay.bind(this);
    this.deleteIncome = this.deleteIncome.bind(this);

    this.state = {
      income: [],
      thirtyIncomeTotal: 0,
      yearlyIncomeTotal: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/income/")
      .then((response) => {
        this.setState({ income: response.data });
        var i;
        var thirtyDayTotal = 0; //total income payment for the next 30 day period
        var yearlyTotal = 0; //total income payment for the next annual period
        var thirtyFactor = 0;
        var yearlyFactor = 0;
        for (i = 0; i < response.data.length; i++) {
          if (this.state.income[i].incomeTerm === "One-Time") {
            thirtyFactor = 1;
            yearlyFactor = 1;
          } else if (this.state.income[i].incomeTerm === "Hourly (5 hours/week)") {
            thirtyFactor = 20; //approximately 20 hours in 30 days
            yearlyFactor = 240; //approximately 240 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (10 hours/week)") {
            thirtyFactor = 40; //approximately 40 hours in 30 days
            yearlyFactor = 480; //approximately 480 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (15 hours/week)") {
            thirtyFactor = 60; //approximately 60 hours in 30 days
            yearlyFactor = 720; //approximately 720 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (20 hours/week)") {
            thirtyFactor = 80; //approximately 80 hours in 30 days
            yearlyFactor = 960; //approximately 960 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (25 hours/week)") {
            thirtyFactor = 100; //approximately 100 hours in 30 days
            yearlyFactor = 1200; //approximately 1200 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (30 hours/week)") {
            thirtyFactor = 120; //approximately 120 hours in 30 days
            yearlyFactor = 1440; //approximately 1440 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (35 hours/week)") {
            thirtyFactor = 140; //approximately 140 hours in 30 days
            yearlyFactor = 1680; //approximately 1680 hours in a year
          } else if (this.state.income[i].incomeTerm === "Hourly (40 hours/week)") {
            thirtyFactor = 160; //approximately 160 hours in 30 days
            yearlyFactor = 1920; //approximately 1920 hours in a year
          } else if (this.state.income[i].incomeTerm === "Daily (1 day/week)") {
            thirtyFactor = 4; //4 days
            yearlyFactor = 48; //48 days
          } else if (this.state.income[i].incomeTerm === "Daily (2 days/week)") {
            thirtyFactor = 8; //8 days
            yearlyFactor = 96; //96 days
          } else if (this.state.income[i].incomeTerm === "Daily (3 days/week)") {
            thirtyFactor = 12; //12 days
            yearlyFactor = 144; //144 days
          } else if (this.state.income[i].incomeTerm === "Daily (4 days/week)") {
            thirtyFactor = 16; //16 days
            yearlyFactor = 198; //198 days
          } else if (this.state.income[i].incomeTerm === "Daily (5 days/week)") {
            thirtyFactor = 20; //20 days
            yearlyFactor = 240; //240 days
          } else if (this.state.income[i].incomeTerm === "Daily (6 days/week)") {
            thirtyFactor = 24; //24 days
            yearlyFactor = 288; //288 days
          } else if (this.state.income[i].incomeTerm === "Daily (7 days/week)") {
            thirtyFactor = 28; //28 days
            yearlyFactor = 336; //336 days
          } else if (this.state.income[i].incomeTerm === "Weekly") {
            thirtyFactor = 4; //4 weeks in 30 days
            yearlyFactor = 52; //52 weeks in a year
          } else if (this.state.income[i].incomeTerm === "Bi-Weekly") {
            thirtyFactor = 2; //2 bi-weeks in 30 days
            yearlyFactor = 26; //26 bi-weeks in a year
          } else if (this.state.income[i].incomeTerm === "Monthly") {
            thirtyFactor = 1; //1 month in 30 days
            yearlyFactor = 12; //12 months in a year
          } else if (this.state.income[i].incomeTerm === "Semi-Anually") {
            thirtyFactor = 0;
            yearlyFactor = 2; //2 semi annuall payments
          } else if (this.state.income[i].incomeTerm === "Anually") {
            thirtyFactor = 0;
            yearlyFactor = 1; //12 months in a year
          } else {
            thirtyFactor = 0; //only shows for 30 days, other terms are excluded
            yearlyFactor = 0; //only shows for 30 days, other terms are excluded
          }

          thirtyDayTotal +=
            Number(this.state.income[i].incomeAmount) * thirtyFactor;
          yearlyTotal +=
            Number(this.state.income[i].incomeAmount) * yearlyFactor;
        } //calculates total of all bills displayed
        this.setState({ thirtyIncomeTotal: thirtyDayTotal });
        this.setState({ yearlyIncomeTotal: yearlyTotal });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //function to delete inceom item
  deleteIncome(incomeId) {
    axios
      .delete("https://simpler-finance-tanveer.herokuapp.com/api/income/delete/" + incomeId)
    this.setState({
      income: this.state.income.filter((el) => el._id !== incomeId),
    });

    document.getElementById('update-text').innerHTML='Please refresh to update totals.';//appears once user deletes an item

  }

  //function to render each income item
  incomeDisplay() {
    return this.state.income.map((currentIncome) => {
      return (
        <Income
          income={currentIncome}
          deleteIncome={this.deleteIncome}
          thirtyDayTotal={this.state.thirtyIncomeTotal}
          yearlyTotal={this.state.yearlyIncomeTotal}
          key={currentIncome._id}
        />
      );
    });
  }

  //renders income display
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <h3 className="text-center">Your Current Income(s)</h3>
            <div className="jumbotron jumbotron-income">
              <div className="income-text">
                <h1 className="display-4 text-center">
                  $ {(this.state.thirtyIncomeTotal).toLocaleString(undefined, {maximumFractionDigits:2})}
                </h1>
                <h2 className="lead text-center">
                  is your Total Income before taxes (next 30 days).
                </h2>
                <h1 className="display-4 text-center">
                  $ {(this.state.yearlyIncomeTotal).toLocaleString(undefined, {maximumFractionDigits:2})}
                </h1>
                <h2 className="lead text-center">
                  is your Total Income before taxes (next year).
                </h2>
              </div>
            </div>
            <div id="update-text" className="update-text"></div>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Source</th>
                  <th>Institution</th>
                  <th>Payment Term</th>
                  <th>Payment Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.incomeDisplay()}</tbody>
            </table>
            <p>
              <a
                href="/income/add"
                type="button"
                class="btn btn-warning btn-lg btn-block"
              >
                {" "}
                Add New Income
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

//renders each inceom item, including actions
const Income = (props) => (
  <tr>
    <td className="text-center">{props.income.incomeSource}</td>
    <td className="text-center">{props.income.incomeInstitution}</td>
    <td className="text-center">{props.income.incomeTerm}</td>
    <td className="text-center">{"$ " + (props.income.incomeAmount).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
    <td>
      <Link
        to={"/income/update/" + props.income._id}
        type="button"
        className="btn btn-primary btn-center"
      >
        Update
      </Link>{" "}
      <p>
        <a
          type="button"
          className="btn btn-danger btn-center"
          onClick={() => {
            props.deleteIncome(props.income._id);
          }}
        >
          {" "}
          Delete
        </a>
      </p>
    </td>
  </tr>
);

IncomeDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withRouter(IncomeDisplay));
