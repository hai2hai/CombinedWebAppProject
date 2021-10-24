import { ActionTypes } from "../constants/action-types";

export const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, payload };
    case ActionTypes.REMOVE_USER:
      return {};
    default:
      return state;
  }
};