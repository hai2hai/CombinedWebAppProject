/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart } from "../redux/actions/cartActions";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="ui container cart">
      <h3>Cart</h3>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item =>
          (<tr>
            <td data-label="Name">{item.title}</td>
            <td data-label="Image">
              <img className="ui fluid image" src={item.image} style={{ width: '50px' }} />
            </td>
            <td data-label="Price">{item.price}</td>
            <td data-label="Price">1</td>
          </tr>)
          )}
        </tbody>
        <tfoot>
          <th></th>
          <th></th>
          <th></th>
          <th>
            Total Price: {cart.items.reduce((a, b) => a + b.price, 0.0)}
          </th>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
