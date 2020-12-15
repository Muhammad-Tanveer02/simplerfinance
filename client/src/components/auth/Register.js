//requirements
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  componentDidMount() {
    //redirects logged in users to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <p>
              <a href="/" type="button" class="btn btn-primary">
                <span class="glyphicon glyphicon-home"></span> Back to Home
              </a>
            </p>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name: </label>
                <input
                  type="name"
                  id="name"
                  placeholder="Enter Name here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.name,
                  })}
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <span className="text-danger">{errors.name}</span>
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.email,
                  })}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <span className="text-danger">{errors.email}</span>
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Email here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.password,
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <span className="text-danger">{errors.password}</span>
              </div>
              <div className="form-group">
                <label>Confirm Password: </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-Enter your password here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.confirmPassword,
                  })}
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={errors.confirmPassword}
                />
                <span className="text-danger">{errors.confirmPassword}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block"
                >
                  Complete Registration!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
