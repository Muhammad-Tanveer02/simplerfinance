//requirements
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAccount } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
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

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.updateAccount(
      userInfo,
      this.props.history,
      this.props.match.params.id
    );
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
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
                <label>Email (Cannot be updated): </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email here"
                  required
                  className={classnames("form-control", {
                    invalid: errors.email,
                  })}
                  value={this.state.email}
                  error={errors.email}
                />
                <span className="text-danger">{errors.email}</span>
              </div>
              <div className="form-group">
                <label>
                  Password (Please enter your password, or set a new password to
                  complete the account update):{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password here"
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
                  Update Account
                </button>
                <p className="text-danger text-center">
                  NOTICE: Please re-login to complete update.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateAccount.propTypes = {
  updateAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateAccount })(
  withRouter(UpdateAccount)
);
