import axios from "axios";

import { GET_ERRORS } from "./types";

// Add Expense
export const addExpense = (expenseInfo, history) => (dispatch) => {
  axios
    .post("/api/expenses/add", expenseInfo)
    .then((res) => history.push("/expenses"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Update Expense
export const updateExpense = (expenseInfo, history, id) => (dispatch) => {
  axios
    .patch(`/api/expenses/update/${id}`, expenseInfo)
    .then((res) => history.push("/expenses"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
