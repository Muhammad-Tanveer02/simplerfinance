//requirements
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { addBill } from "../../actions/billActions";
import classnames from "classnames";

//dropdown select options for type of bill, "Select Type here..." prompts error if selected
const typeOptions = [
  "Select Type here...",
  "Utilities",
  "Rent",
  "Insurance",
  "Credit Card",
  "Property taxes",
  "Automotive",
  "Other",
];

class AddBills extends Component {
  constructor(props) {
    super(props);
    this.onChangeBillName = this.onChangeBillName.bind(this);
    this.onChangeBillType = this.onChangeBillType.bind(this);
    this.onChangeBillInstitution = this.onChangeBillInstitution.bind(this);
    this.onChangeBillAmount = this.onChangeBillAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      billName: "",
      billType: "",
      selectedTypeOption: typeOptions[0],
      billInstitution: "",
      billAmount: Number,
      date: new Date(),
      users: [],
      errors: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChangeBillName(e) {
    this.setState({
      billName: e.target.value,
    });
  }

  onChangeBillType(e) {
    this.setState({
      billType: e.target.value,
    });
  }

  onChangeBillInstitution(e) {
    this.setState({
      billInstitution: e.target.value,
    });
  }

  onChangeBillAmount(e) {
    this.setState({
      billAmount: e.target.value.replace(/[^0-9.]/g, ""), //restricts user to typing/submitting only numbers and a decimal point
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const billData = {
      email: jwt_decode(localStorage.jwtToken).email,
      billName: this.state.billName,
      billType: this.state.billType,
      billInstitution: this.state.billInstitution,
      billAmount: this.state.billAmount,
      date: this.state.date,
    };
    this.props.addBill(billData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <p>
              <a href="/bills" type="button" class="btn btn-primary">
                <span class="glyphicon glyphicon-home"></span> View Current
                Bills
              </a>
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name of Bill</label>
                <input
                  type="billName"
                  id="billName"
                  placeholder="Enter Name of Bill here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.billName,
                  })}
                  value={this.state.billName}
                  onChange={this.onChangeBillName}
                  error={errors.billName}
                />
                <span className="text-danger">{errors.billName}</span>
              </div>
              <div className="form-group">
                <label>Type of Bill</label>
                <select
                  type="billType"
                  id="billType"
                  placeholder="Select type..."
                  required
                  className={classnames("form-control", {
                    invalid: errors.billType,
                  })}
                  value={this.state.billType}
                  onChange={this.onChangeBillType}
                  error={errors.billType}
                >
                  {typeOptions.map(function (type) {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.billType}</span>
              </div>
              <div className="form-group">
                <label>Institution Owed</label>
                <input
                  type="billInstitution"
                  id="billInstitution"
                  placeholder="Enter Name of Bill here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.billInstitution,
                  })}
                  value={this.state.billInstitution}
                  onChange={this.onChangeBillInstitution}
                  error={errors.billInstitution}
                />
                <span className="text-danger">{errors.billInstitution}</span>
              </div>
              <div className="form-group">
                <label>Amount Due ($)</label>
                <input
                  type="billAmount"
                  id="billAmount"
                  placeholder="Enter Name of Bill here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.billAmount,
                  })}
                  value={this.state.billAmount}
                  onChange={this.onChangeBillAmount}
                  error={errors.billAmount}
                />
                <span className="text-danger">{errors.billAmount}</span>
              </div>
              <div className="form-group">
                <label>Payment Due Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Add New Bill"
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

AddBills.propTypes = {
  addBill: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { addBill })(withRouter(AddBills));
