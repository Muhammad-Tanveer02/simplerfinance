//requirements
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogout } from "../../actions/authActions";
import jwt_decode from "jwt-decode";

class Navbar extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.userLogout();
  };

  render() {
    //navbar will not render at these endpoints
    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/register") return null;
    if (window.location.pathname === "/") return null;
    return (
      <div className="navbar-fixed">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container">
            <a class="navbar-brand" href="/dashboard">
              simplerFINANCE
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/income">
                    Manage Income
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/bills">
                    Manage Bills
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/expenses">
                    Manage Exepenses
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a
                    class="nav-link"
                    href={
                      "users/update/" + jwt_decode(localStorage.jwtToken).id
                    }
                  >
                    Manage Account
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#" onClick={this.onLogout}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  userLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { userLogout })(Navbar));
