import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom'
import request from '../utils/request';

const PrivateRoutes = () => {
  const navigate = useNavigate();

  

  useEffect(() => {
    const checkTokenValidity = async () => {
      console.log("Starte tokencheck")
      const token = localStorage.getItem("jwt");
  
      if (token) {
        // Sende einen API-Aufruf an den Server, um den Token zu überprüfen
        try {
          const response = await fetch("http://localhost:8081/api/auth/checkkey", {
            method: 'GET',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
  
  
          console.log(response.status)
          if (response.status === 200) {
            console.log("Authenticated true")
            return true
          } else {
            navigate("/login")
          }
        } catch (error) {
          navigate("/login")
        }
      } else {
        navigate("/login")
      }
    }

    checkTokenValidity();
  }, [navigate])

  return(
    <Outlet/> 
  )
}

export default PrivateRoutes