import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importiere Link
import request from "../utils/request";
import './LoginPage.css';

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await request("/auth/login", "POST", { username, password });

    if (response.success) {
      // jwt und Benutzerdaten speichern
      localStorage.setItem("jwt", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
      setErrorMessage("Login erfolgreich");
    } else {
      // Fehlermeldung anzeigen
      setErrorMessage(response.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handlePasswordChange} />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p className="register-link">Noch keinen Account? <Link to="/register">Registrieren</Link></p>
    </div>
  )
}

export default LoginPage;
