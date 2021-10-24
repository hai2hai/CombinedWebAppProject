import { ActionTypes } from "../constants/action-types";

const intialState = {
  items: []
};

export const cartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_CART:
      return { ...state, items: payload };
    case ActionTypes.REMOVE_ALL_CART:
      return {};
    default:
      return state;
  }
};