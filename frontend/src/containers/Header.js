import React from "react";
import { Link } from "react-router-dom";
import UserGroup from "./UserGroup";

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2><Link to="/">WebApp Shop</Link></h2>
        <UserGroup />
      </div>
    </div>
  );
};

export default Header;
