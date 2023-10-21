import React, { useEffect, useState } from "react";
import request from "../utils/request";

const UserPage = (props) => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const onUsernameChange = (value) => {
    setUsername(value)
  }

  const onGroupnameChange = (value) => {
    setGroup(value)
  }

  const fetchData = async (username, group) => {
    const result = await request(`/user/list?username=${username}&group=${group}`, "GET");
    console.log(result)
    if(result.error){
      setErrorMessage(result.message)
    } else {
      setUserList(result.users)
    }
  }

  const onClick = (e) => {
    e.preventDefault();
    fetchData(username, group)
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderUser = (user) => (
    <div>
      <p>Username: {user.username}</p>
      <p>Address: {user.address}</p>
      <p>Gruppe: {user.group}</p>
    </div>
  ) ;

  return (
    <div>
      <form>
        <label>Username:</label>
        <input type="text" onChange={(e) => onUsernameChange(e.target.value)}/>
        <label>Gruppe:</label>
        <input type="text" onChange={(e) => onGroupnameChange(e.target.value)}/>
        <button onClick={onClick}>Suchen</button>
      </form>
      <div>
      {
        userList.map(user => renderUser(user))
      }
      </div>
    </div>
    
  )
}

export default UserPage;