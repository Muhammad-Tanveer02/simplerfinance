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
          <header class="jumbotron my-4 jumbotron-dashboard">
            <h1 class="display-3">Hey there, {user.name}!</h1>
            <p class="lead-home">Welcome to Simpler Finance!</p>
            <a
              href={"users/update/" + jwt_decode(localStorage.jwtToken).id}
              class="btn btn-success btn-lg{}"
            >
              My Account
            </a>
          </header>

          <div class="row text-center">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <img class="income-img-top" src={incomeImage} alt=""></img>
                <div class="card-body">
                  <h4 class="card-title">Manage Income</h4>
                </div>
                <div class="card-footer">
                  <a href="/income" class="btn btn-success">
                    Check Income
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <img class="bills-img-top" src={billsImage} alt=""></img>
                <div class="card-body">
                  <h4 class="card-title">Manage Bills</h4>
                </div>
                <div class="card-footer">
                  <a href="/bills" class="btn btn-success">
                    Check Bills
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <img class="card-img-top" src={expensesImage} alt=""></img>
                <div class="card-body">
                  <h4 class="card-title">Manage Expenses</h4>
                </div>
                <div class="card-footer">
                  <a href="/expenses" class="btn btn-success">
                    Check Expenses
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="py-5 bg-dark">
          <div class="container">
            <p class="m-0 text-center text-white">
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
