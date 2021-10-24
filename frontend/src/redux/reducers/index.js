import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer'

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  user: userReducer,
  cart: cartReducer
});
export default reducers;
