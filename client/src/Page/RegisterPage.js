import React, { useState } from "react";

import request from "../utils/request";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(undefined);

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleRegistration (e) {
    e.preventDefault();

    const response = await request("/auth/register", "POST", { username, password});

    if (response.success) {
      // jwt abspeichern
      localStorage.setItem("jwt", response.jwt)
    } else {
      // Message anzeigen
      setMessage(response.message)
    }
  }

  return (
    <div>
      <h1>Registrieren</h1>
      <form>
        <label>Username:</label>
        <input type="text" onChange={handleUsernameChange} />
        <label>Password:</label>
        <input type="text" onChange={handlePasswordChange} />
        <button onClick={handleRegistration}>Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default RegisterPage
