import React from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {

  const handleOnClick = () => {
    localStorage.removeItem("jwt");
  }

  return (
    <>
      <NavBar />
      <h1>Eingeloggt</h1>
    </>
  );
}

export default HomePage;