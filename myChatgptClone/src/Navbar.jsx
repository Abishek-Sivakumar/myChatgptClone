import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-div">
        <p>GameHub</p>
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </div>
  );
}

export default Navbar;
