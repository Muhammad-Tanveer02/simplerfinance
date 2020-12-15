//requirements
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    //redirects logged in users to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (this.props.errors !== nextProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <p>
              <a href="/" type="button" class="btn btn-success">
                <span class="glyphicon glyphicon-home"></span> Back to Home
              </a>
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email Address: </label>
                <input
                  type="email"
                  id="email"
                  required
                  className={classnames("form-control", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <span className="text-danger">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  id="password"
                  required
                  className={classnames("form-control", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <span className="text-danger">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Login!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
