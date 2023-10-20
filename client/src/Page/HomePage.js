import React from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {

  const handleOnClick = () => {
    localStorage.removeItem("jwt");
  }

  return (
    <>
      <NavBar />
      <h1>HAAALLLOoo</h1>
    </>
  );
}

export default HomePage;