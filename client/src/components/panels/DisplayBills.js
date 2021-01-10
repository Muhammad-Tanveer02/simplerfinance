//requirements
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class BillsList extends Component {
  constructor(props) {
    super(props);

    this.billList = this.billList.bind(this);
    this.deleteBill = this.deleteBill.bind(this);

    this.state = { bills: [], billTotal: 0 };
  }

  componentDidMount() {
    axios
      .get("https://simpler-finance-tanveer.herokuapp.com/api/bills/")
      .then((response) => {
        console.log(response.data);
        this.setState({ bills: response.data });
        var i;
        var total = 0;
        for (i = 0; i < response.data.length; i++) {
          total += Number(this.state.bills[i].billAmount);
        } //calculates total of all bills displayed
        this.setState({ billTotal: total });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBill(billId) {
    axios
      .delete("https://simpler-finance-tanveer.herokuapp.com/api/bills/delete/" + billId)
      .then((response) => {
        console.log(response.data);
      });
    this.setState({
      bills: this.state.bills.filter((el) => el._id !== billId),
    });
    window.location.reload();//refresed to complete deletion
  }

  billList() {
    return this.state.bills.map((currentBill) => {
      return (
        <Bills
          bill={currentBill}
          total={this.state.billTotal}
          deleteBill={this.deleteBill}
          key={currentBill._id}
        />
      );
    });
  }

  render(props) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <h3 className="text-center">Your Current Bills</h3>
            <div className="jumbotron jumbotron-bill">
              <div className="bill-text">
                <h1 className="display-4 text-center">
                  $ {(this.state.billTotal).toLocaleString(undefined, {maximumFractionDigits:2})}
                </h1>
                <h2 className="lead text-center">is your Bill Total.</h2>
              </div>
            </div>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Name of Bill</th>
                  <th>Type of Bill</th>
                  <th>Institution Owed</th>
                  <th>Amount Due ($)</th>
                  <th>Payment Due Date</th>
                  <th>Time to Pay (Since Last Updated)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.billList()}</tbody>
            </table>
            <p>
              <a
                href="/bills/add"
                type="button"
                class="btn btn-warning btn-lg btn-block"
              >
                {" "}
                Add New Bill
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const Bills = (props) => (
  <tr>
    <td className="text-center">{props.bill.billName}</td>
    <td className="text-center">{props.bill.billType}</td>
    <td className="text-center">{props.bill.billInstitution}</td>
    <td className="text-center">{"$ " + props.bill.billAmount}</td>
    <td className="text-center">{props.bill.date.substring(0, 10)}</td>
    <td className="text-center">{props.bill.daysLeft + " Day(s)"}</td>
    <td>
      <Link
        to={"/bills/update/" + props.bill._id}
        type="button"
        className="btn btn-primary btn-center"
      >
        Update
      </Link>{" "}
      <p>
        <a
          href="/bills"
          type="button"
          className="btn btn-danger btn-center"
          onClick={() => {
            props.deleteBill(props.bill._id);
          }}
        >
          {" "}
          Delete
        </a>
      </p>
    </td>
  </tr>
);

BillsList.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withRouter(BillsList));
