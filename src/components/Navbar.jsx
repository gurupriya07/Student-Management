import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        🎓 StudentHub
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="profile">
        Admin 👤
      </div>
    </nav>
  );
}

export default Navbar;
