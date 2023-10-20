import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

import request from '../utils/request';


export default function PersonalDataPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({ username: "LÄDT...", address: "LÄDT..." });

  useEffect(() => {

    const fetchData = async () => {
      console.log(searchParams.get('username'));
      const response = await request(`/user?username=${searchParams.get('username')}`, 'GET');
      
      setUserData(response.user)
    }

    fetchData();

  }, [])

  return (
    <div>
      <p>Username: {userData.username}</p>
      <p>Adresse: {userData.address}</p>
    </div>
  )
}
