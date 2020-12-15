//requirements
import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { updateExpense } from "../../actions/expenseActions";
import classnames from "classnames";

//dropdown select options for type of expense, "Select Type here..." prompts error if selected
const typeOptions = [
  "Select Type here...",
  "Purchases",
  "Movie/TV Streaming Service",
  "Music Subsciption Service",
  "Other Subscription Service",
  "Stocks",
  "Other",
];

//dropdown select options for expense term of payment, "Select Type here..." prompts error if selected
const termOptions = [
  "Select Type here...",
  "One-Time",
  "Hourly",
  "Daily",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Semi-Anually",
  "Anually",
  "5-Year Term",
  "10-Year Term",
];

class UpdateExpenses extends Component {
  constructor(props) {
    super(props);
    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onChangeExpenseType = this.onChangeExpenseType.bind(this);
    this.onChangeExpenseCompany = this.onChangeExpenseCompany.bind(this);
    this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
    this.onChangeExpenseTerm = this.onChangeExpenseTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      expenseName: "",
      expenseType: "",
      expenseCompany: "",
      expenseAmount: 0,
      expenseTerm: "",
      users: [],
      errors: {},
    };
  }

  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/expenses/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          email: response.data.email,
          expenseName: response.data.expenseName,
          expenseType: response.data.expenseType,
          expenseCompany: response.data.expenseCompany,
          expenseAmount: Number(response.data.expenseAmount),
          expenseTerm: response.data.expenseTerm,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChangeExpenseName(e) {
    this.setState({
      expenseName: e.target.value,
    });
  }

  onChangeExpenseType(e) {
    this.setState({
      expenseType: e.target.value,
    });
  }

  onChangeExpenseCompany(e) {
    this.setState({
      expenseCompany: e.target.value,
    });
  }

  onChangeExpenseAmount(e) {
    this.setState({
      expenseAmount: e.target.value.replace(/[^0-9.]/g, ""), //restricts user to typing/submitting only numbers and a decimal point
    });
  }

  onChangeExpenseTerm(e) {
    this.setState({
      expenseTerm: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const expenseInfo = {
      email: jwt_decode(localStorage.jwtToken).email,
      expenseName: this.state.expenseName,
      expenseType: this.state.expenseType,
      expenseCompany: this.state.expenseCompany,
      expenseAmount: this.state.expenseAmount,
      expenseTerm: this.state.expenseTerm,
    };
    this.props.updateExpense(
      expenseInfo,
      this.props.history,
      this.props.match.params.id
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <p>
              <a href="/expenses" type="button" class="btn btn-danger">
                {" "}
                Cancel
              </a>
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name of Expense</label>
                <input
                  type="expenseName"
                  id="expenseName"
                  placeholder="Enter Name of Expense here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.expenseName,
                  })}
                  value={this.state.expenseName}
                  onChange={this.onChangeExpenseName}
                  error={errors.expenseName}
                />
                <span className="text-danger">{errors.expenseName}</span>
              </div>
              <div className="form-group">
                <label>Type of Expense</label>
                <select
                  type="expenseType"
                  id="expenseType"
                  placeholder="Enter Type of Expense here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.expenseType,
                  })}
                  value={this.state.expenseType}
                  onChange={this.onChangeExpenseType}
                  error={errors.expenseType}
                >
                  {typeOptions.map(function (type) {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.expenseType}</span>
              </div>
              <div className="form-group">
                <label>Company Owed</label>
                <input
                  type="expenseCompany"
                  id="expenseCompany"
                  placeholder="Enter Company here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.expenseCompany,
                  })}
                  value={this.state.expenseCompany}
                  onChange={this.onChangeExpenseCompany}
                  error={errors.expenseCompany}
                />
                <span className="text-danger">{errors.expenseCompany}</span>
              </div>
              <div className="form-group">
                <label>Amount Due ($)</label>
                <input
                  type="expenseAmount"
                  id="expenseAmount"
                  placeholder="Enter Amount here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.expenseAmount,
                  })}
                  value={this.state.expenseAmount}
                  onChange={this.onChangeExpenseAmount}
                  error={errors.expenseAmount}
                />
                <span className="text-danger">{errors.expenseAmount}</span>
              </div>
              <div className="form-group">
                <label>Payment Term</label>
                <select
                  class="selectpicker"
                  data-style="btn-primary"
                  type="expenseTerm"
                  id="expenseTerm"
                  placeholder="Enter Term Type here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.expenseTerm,
                  })}
                  value={this.state.expenseTerm}
                  onChange={this.onChangeExpenseTerm}
                  error={errors.expenseTerm}
                >
                  {termOptions.map(function (type) {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.expenseTerm}</span>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update Expense"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateExpenses.propTypes = {
  updateExpense: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { updateExpense })(
  withRouter(UpdateExpenses)
);
