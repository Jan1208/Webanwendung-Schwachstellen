import React, { useEffect, useState } from "react";
import request from "../utils/request";
import './UserPage.css'; // Importiere die Styling-Datei
import NavBar from "../components/NavBar";

const UserPage = (props) => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const onUsernameChange = (value) => {
    setUsername(value);
  };

  const onGroupnameChange = (value) => {
    setGroup(value);
  };

  const fetchData = async (username, group) => {
    const result = await request(`/user/list?username=${username}&group=${group}`, "GET");
    console.log(result);
    if (result.error) {
      setErrorMessage(result.message);
    } else {
      setUserList(result.users);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    fetchData(username, group);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderUser = (user) => (
    <div key={user.username} className="user-card">
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Gruppe:</strong> {user.group}</p>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="user-page-container">
      <form className="user-search-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={(e) => onUsernameChange(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="group">Gruppe:</label>
          <input type="text" id="group" onChange={(e) => onGroupnameChange(e.target.value)} />
        </div>
        <button className="search-button" onClick={onClick}>Suchen</button>
      </form>
      <div className="user-list">
        {userList.map(user => renderUser(user))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </>
    
  );
}

export default UserPage;