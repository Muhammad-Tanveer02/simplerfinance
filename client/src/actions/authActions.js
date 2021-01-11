import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login User
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt_decode(token)));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Update User Account
export const updateAccount = (userInfo, history, id) => (dispatch) => {
  axios
    .patch(`/api/users/update/${id}`, userInfo)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Sets user to be logged in
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Sets User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Logs user out
export const userLogout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};