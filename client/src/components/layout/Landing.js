//requirements
import React, { Component } from "react";

//image requirement
const moneyImage = require("../../moneySign.png"); //image displayed on landing

class Landing extends Component {
  render() {
    return (
      <div class="container">
        <div class="jumbotron">
          <div class="container d-flex">
            <div>
              <h1 class="display-4">simplerFINANCE
            </h1>
              <p class="lead">
                Keep up to date with all your bills and expenses in this one
                app!
              </p>
            </div>
            <div class="ml-auto p-2">
              <img class="income-img-top" src={moneyImage} alt=""></img>
            </div>
          </div>
        </div>
        <br />
        <a href="/register" class="btn btn-success btn-lg btn-block active">
          Resgister
        </a>
        <a href="/login" class="btn btn-link btn-lg btn-block active">
          Already have an account? Log-In here!
        </a>
      </div>
    );
  }
}

export default Landing;
