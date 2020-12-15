//requirements
import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { updateIncome } from "../../actions/incomeActions";
import classnames from "classnames";

//dropdown select options for source of income, "Select Source here..." prompts error if selected
const sourceOptions = [
  "Select Source here...",
  "Employment",
  "Government",
  "Stocks",
  "Funds",
  "Other",
];

//dropdown select options for income term of payment, "Select Type here..." prompts error if selected
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

class UpdateIncome extends Component {
  constructor(props) {
    super(props);
    this.onChangeIncomeSource = this.onChangeIncomeSource.bind(this);
    this.onChangeIncomeInstitution = this.onChangeIncomeInstitution.bind(this);
    this.OnChangeIncomeAmount = this.OnChangeIncomeAmount.bind(this);
    this.onChangeIncomeTerm = this.onChangeIncomeTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      incomeSource: "",
      incomeInstitution: "",
      incomeAmount: Number,
      incomeTerm: "",
      users: [],
      errors: {},
    };
  }
  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/income/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          email: response.data.email,
          incomeSource: response.data.incomeSource,
          incomeInstitution: response.data.incomeInstitution,
          incomeAmount: Number(response.data.incomeAmount),
          incomeTerm: response.data.incomeTerm,
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

  onChangeIncomeSource(e) {
    this.setState({
      incomeSource: e.target.value,
    });
  }

  onChangeIncomeInstitution(e) {
    this.setState({
      incomeInstitution: e.target.value,
    });
  }

  OnChangeIncomeAmount(e) {
    this.setState({
      incomeAmount: e.target.value.replace(/[^0-9.]/g, ""), //restricts user to typing/submitting only numbers and a decimal point
    });
  }

  onChangeIncomeTerm(e) {
    this.setState({
      incomeTerm: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const incomeData = {
      email: jwt_decode(localStorage.jwtToken).email, //email of current logged in user
      incomeSource: this.state.incomeSource,
      incomeInstitution: this.state.incomeInstitution,
      incomeAmount: this.state.incomeAmount,
      incomeTerm: this.state.incomeTerm,
    };
    this.props.updateIncome(
      incomeData,
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
              <a href="/income" type="button" class="btn btn-danger">
                {" "}
                Cancel
              </a>
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Source of Income</label>
                <select
                  type="incomeSource"
                  id="incomeSource"
                  required
                  className={classnames("form-control", {
                    invalid: errors.incomeSource,
                  })}
                  value={this.state.incomeSource}
                  onChange={this.onChangeIncomeSource}
                  error={errors.incomeSource}
                >
                  {sourceOptions.map(function (type) {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.incomeSource}</span>
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input
                  type="incomeInstitution"
                  id="incomeInstitution"
                  placeholder="Enter Name of Company here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.incomeInstitution,
                  })}
                  value={this.state.incomeInstitution}
                  onChange={this.onChangeIncomeInstitution}
                  error={errors.incomeInstitution}
                />
                <span className="text-danger">{errors.incomeInstitution}</span>
              </div>
              <div className="form-group">
                <label>Payment Term</label>
                <select
                  data-style="btn-primary"
                  type="incomeTerm"
                  id="incomeTerm"
                  placeholder="Enter Term Type here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.incomeTerm,
                  })}
                  value={this.state.incomeTerm}
                  onChange={this.onChangeIncomeTerm}
                  error={errors.incomeTerm}
                >
                  {termOptions.map(function (type) {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.incomeTerm}</span>
              </div>
              <div className="form-group">
                <label>Amount (Before Taxes)</label>
                <input
                  type="incomeAmount"
                  id="incomeAmount"
                  placeholder="Enter Amount here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.incomeAmount,
                  })}
                  value={this.state.incomeAmount}
                  onChange={this.OnChangeIncomeAmount}
                  error={errors.incomeAmount}
                />
                <span className="text-danger">{errors.incomeAmount}</span>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update"
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

UpdateIncome.propTypes = {
  updateIncome: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { updateIncome })(
  withRouter(UpdateIncome)
);
