import axios from "axios";

import { GET_ERRORS } from "./types";

// Add Bill
export const addBill = (billData, history) => (dispatch) => {
  axios
    .post("/api/bills/add", billData)
    .then((res) => history.push("/bills"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Update Bill
export const updateBill = (billData, history, id) => (dispatch) => {
  axios
    .patch(`/api/bills/update/${id}`, billData)
    .then((res) => history.push("/bills"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
