import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css"

const NavBar = () => {
  const getPersonalDataLink = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username){
      return `/personal?username=${user.username}`
    } else {
      return `/personal`
    }
  }

  const handleLogout = () => {
    // Entferne den JWT-Token aus dem LocalStorage
    localStorage.removeItem("jwt");
    // Weiterleitung zur Startseite
    window.location.href = "/";
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={getPersonalDataLink()} className="nav-link">
            Meine Daten
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user" className="nav-link">
            Nutzer
          </Link>
        </li>
        <li className="nav-item logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  )
}


export default NavBar;