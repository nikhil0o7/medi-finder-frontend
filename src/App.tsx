// import React from "react";
import "./App.scss";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/dashBoard";
import Hospitals from "./pages/Hospitals/Hospitals";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Account from "./pages/Account/Account";
import HospitalsInfo from "./pages/HospitalsInfo/HospitalsInfo";
function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("email");
  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <Routes>
            <Route path="/login" key={location.key} element={<Login />} />
            <Route
              path="/registration"
              key={location.key}
              element={<SignUp />}
            />
            <Route
              path="/dashboard"
              key={location.key}
              // element={<Dashboard />}

              element={
                isAuthenticated === null ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Dashboard />
                )
              }
            />
            <Route path="/Account" key={location.key} element={<Account />} />
            <Route
              path="/HospitalsInfo"
              key={location.key}
              element={<HospitalsInfo />}
            />
            <Route
              path="/Hospitals"
              key={location.key}
              element={
                isAuthenticated === "null" ? (
                  <Navigate replace to="/dashboard" />
                ) : (
                  <Hospitals />
                )
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
