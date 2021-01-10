//requirements
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

//image requirements
const incomeImage = require("../../incomePic.jpg"); //image displayed on income card
const billsImage = require("../../billsPic.jpg"); //image displayed on bill card
const expensesImage = require("../../expensesPic.jpg"); //image displayed on expense card

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="container">
          <header className="jumbotron my-4 jumbotron-dashboard">
            <h1 className="display-3">Hey there, {user.name}!</h1>
            <p className="lead-home">Welcome to Simpler Finance!</p>
            <a
              href={"users/update/" + jwt_decode(localStorage.jwtToken).id}
              className="btn btn-success btn-lg{}"
            >
              My Account
            </a>
          </header>

          <div className="row text-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="income-img-top" src={incomeImage} alt=""></img>
                <div className="card-body">
                  <h4 className="card-title">Manage Income</h4>
                </div>
                <div className="card-footer">
                  <a href="/income" className="btn btn-success">
                    Check Income
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="bills-img-top" src={billsImage} alt=""></img>
                <div className="card-body">
                  <h4 className="card-title">Manage Bills</h4>
                </div>
                <div className="card-footer">
                  <a href="/bills" className="btn btn-success">
                    Check Bills
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="card-img-top" src={expensesImage} alt=""></img>
                <div className="card-body">
                  <h4 className="card-title">Manage Expenses</h4>
                </div>
                <div className="card-footer">
                  <a href="/expenses" className="btn btn-success">
                    Check Expenses
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Simpler Finance 2020
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Dashboard));
