import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import request from '../utils/request';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkTokenValidity = useCallback(async () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      // Sende einen API-Aufruf an den Server, um den Token zu überprüfen
      try {
        const response = await request('/api/checkToken', 'GET');
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity])

  return(
    localStorage.getItem("jwt") ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes