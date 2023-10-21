import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

import request from '../utils/request';


export default function PersonalDataPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({ username: "LÄDT...", address: "LÄDT..." });
  const [message, setMessage] = useState(undefined);

  const onUsernameChange = (value) => {
    setUserData({ ...userData, username: value  });
  }

  const onAddressChange = (value) => {
    setUserData({ ...userData, address: value  });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    const result = await request("/user", "PUT", { username: userData.username, address: userData.address });

    message ? setMessage(result.message) : setMessage("Fehler, bitte kontaktieren Sie einen Administrator.")
  }

  useEffect(() => {

    const fetchData = async () => {
      console.log(searchParams.get('username'));
      const response = await request(`/user?username=${searchParams.get('username')}`, 'GET');
      
      setUserData(response.user)
    }

    fetchData();

  }, [])

  return (
    <form>
      <label>Username:</label>
      <input type="text" onChange={e => onUsernameChange(e.target.value)} value={userData ? userData.username : ""} disabled="disabled" />
      <label>Adresse:</label>
      <input type="text" onChange={e => onAddressChange(e.target.value)} value={userData ? userData.address : ""} />
      <button onClick={handleSubmit}>Daten ändern</button>
      {message && <p>{message}</p>}
      
    </form>
  )
}
