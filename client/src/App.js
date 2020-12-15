//requirements
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

//redux requirements
import { setCurrentUser, userLogout } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

//component imports
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddBills from "./components/panels/AddBills";
import DisplayBills from "./components/panels/DisplayBills";
import UpdateBills from "./components/panels/UpdateBills";
import AddExpenses from "./components/panels/AddExpenses";
import DisplayExpenses from "./components/panels/DisplayExpenses";
import UpdateExpenses from "./components/panels/UpdateExpenses";
import AddIncome from "./components/panels/AddIncome";
import DisplayIncome from "./components/panels/DisplayIncome";
import UpdateIncome from "./components/panels/UpdateIncome";
import UpdateAccount from "./components/panels/UpdateAccount";

if (localStorage.jwtToken) {
  // Auth token header
  setAuthToken(localStorage.jwtToken);
  // Set user and isAuthenticated
  // Token is decoded
  store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (jwt_decode(localStorage.jwtToken).exp < currentTime) {
    // Logouts user if token is expired
    store.dispatch(userLogout());
    // Redirect to login upon logout
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/bills/add" component={AddBills} />
              <PrivateRoute exact path="/bills" component={DisplayBills} />
              <PrivateRoute
                exact
                path="/bills/update/:id"
                component={UpdateBills}
              />
              <PrivateRoute
                exact
                path="/expenses/add"
                component={AddExpenses}
              />
              <PrivateRoute
                exact
                path="/expenses"
                component={DisplayExpenses}
              />
              <PrivateRoute
                exact
                path="/expenses/update/:id"
                component={UpdateExpenses}
              />
              <PrivateRoute exact path="/income/add" component={AddIncome} />
              <PrivateRoute exact path="/income" component={DisplayIncome} />
              <PrivateRoute
                exact
                path="/income/update/:id"
                component={UpdateIncome}
              />
              <PrivateRoute exact path="/users" component={UpdateIncome} />
              <PrivateRoute
                exact
                path="/users/update/:id"
                component={UpdateAccount}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
