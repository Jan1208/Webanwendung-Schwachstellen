import React from "react";
import { Link } from "react-router-dom";

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

  return (<nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={getPersonalDataLink()}>Meine Daten</Link>
      </li>
      <li>
        <Link to={"/user"}>Nutzer</Link>
      </li>
      <li>
      <div onClick={handleLogout}>Logout</div>
      </li>
    </ul>
  </nav>)
}


export default NavBar;