import React from "react"
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import PrivateRoutes from "./components/PrivateRoutes";
import RegisterPage from "./Page/RegisterPage";
import PersonalDataPage from "./Page/PersonalDataPage";
import UserPage from "./Page/UsersPage";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/personal" element={ <PersonalDataPage /> } />
            <Route path="/user" element={ <UserPage /> } />
          </Route>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
