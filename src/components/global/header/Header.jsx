import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <Link to="/news">TechNews</Link>
          </div>
          <div className="menu">
            <Link to="add-News">Добавить новость</Link>
          </div>
          <div className="user">
            <Link to="/account">
              {" "}
              <AccountCircleIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
