import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {isAuth, role} = useSelector((state) => state.auth);
  return isAuth && role === "user" ? children : <Navigate to="/" />
};

export default PrivateRoute;
