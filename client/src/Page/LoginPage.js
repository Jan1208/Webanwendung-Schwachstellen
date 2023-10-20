import React, { useState } from "react";

import request from "../utils/request";

import './LoginPage.css'

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleLogin (e) {
    e.preventDefault();

    const response = await request("/auth/login", "POST", { username, password})

    if (response.success) {
      // jwt abspeichern
      localStorage.setItem("jwt", response.jwt)
      setErrorMessage("Login erfolgreich")
    } else {
      // Message anzeigen
      setErrorMessage(response.message)
    }
  }

  return (
    <div>
      <h1>login</h1>
      <form>
        <label>Username:</label>
        <input type="text" onChange={handleUsernameChange} />
        <label>Password:</label>
        <input type="text" onChange={handlePasswordChange} />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default LoginPage
