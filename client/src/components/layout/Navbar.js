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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/dashboard">
              simplerFINANCE
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/income">
                    Manage Income
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/bills">
                    Manage Bills
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/expenses">
                    Manage Exepenses
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a
                    className="nav-link"
                    href={
                      "users/update/" + jwt_decode(localStorage.jwtToken).id
                    }
                  >
                    Manage Account
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#" onClick={this.onLogout}>
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
