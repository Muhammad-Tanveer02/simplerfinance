import { ADD_BILL, TOTAL_BILL, UPDATE_BILL } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};
z;
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BILL:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case UPDATE_BILL:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
  }
}
