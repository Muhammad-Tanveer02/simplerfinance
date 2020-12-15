import axios from "axios";

import { GET_ERRORS } from "./types";

// Add Income
export const addIncome = (incomeData, history) => (dispatch) => {
  axios
    .post("/api/income/add", incomeData)
    .then((res) => history.push("/income"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Update Income
export const updateIncome = (incomeData, history, id) => (dispatch) => {
  axios
    .patch(`/api/income/update/${id}`, incomeData)
    .then((res) => history.push("/income"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
