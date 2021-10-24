/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../redux/actions/userActions";
import mgr, { getUser } from '../config/oidc-config';
import { Link } from "react-router-dom";


const UserGroup = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);

  const logIn = async (e) => {
    await mgr.signinRedirect();
    let user = await getUser();
    console.log(user);
  }

  const logOut = (e) => {
    dispatch(removeUser());
    mgr.signoutRedirect();
  }

  useEffect(() => {
    getUser().then(user => {
      if (user) {
        dispatch(setUser(user.profile));
      } else {
        dispatch(setUser(null));
      }
      axios.defaults.headers.common["Authorization"] = "Bearer " + user?.access_token;
    });
  }, [])

  return (
    <div className="user_group">
      {loggedUser.payload &&
        (
          <div>
            <a>
              <b>Welcome: </b>
              <span>{loggedUser.payload.given_name}</span>
            </a>
            <a onClick={e => logOut(e)}>
              Log out
            </a>
          </div>
        )
      }
      {!loggedUser.payload &&
        (<a onClick={e => logIn(e)}>
          Log in
        </a>)
      }
      {!loggedUser.payload &&
        (<a href="https://localhost:5000/account/register?returnUrl=%2F">
          Register
        </a>)
      }
      <Link to={"/cart"}>
        <img
          src="https://image.flaticon.com/icons/svg/102/102276.svg"
          alt="shopping cart"
        />
      </Link>
    </div>
  );
};

export default UserGroup;
