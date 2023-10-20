import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  return (<nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={`/personal?username=${user.username}`}>Meine Daten</Link>
      </li>
    </ul>
  </nav>)
}


export default NavBar;