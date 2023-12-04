import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importiere Link
import request from "../utils/request";
import './RegisterPage.css';

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    const response = await request("/auth/register", "POST", { username, password });

    if (response.success) {
      // JWT abspeichern
      localStorage.setItem("jwt", response.jwt);
      setMessage("Registrierung erfolgreich");
    } else {
      // Fehlermeldung anzeigen
      setMessage(response.message);
    }
  }

  return (
    <div className="register-container">
      <h1>Registrieren</h1>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handlePasswordChange} />
        </div>
        <button className="register-button" onClick={handleRegistration}>Registrieren</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p className="login-link">Bereits einen Account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default RegisterPage;
