import { ActionTypes } from "../constants/action-types";

export const addCart = (item) => {
  return {
    type: ActionTypes.ADD_CART,
    payload: item,
  };
};

export const removeAllCart = () => {
  return {
    type: ActionTypes.REMOVE_ALL_CART,
  };
};
