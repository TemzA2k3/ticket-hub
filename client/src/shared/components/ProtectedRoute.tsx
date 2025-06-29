import React from "react";
import { useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { Navigate, useLocation } from "react-router-dom";



export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(state => state.auth.user) || localStorage.getItem("user")
  const token = useAppSelector(state => state.auth.token) || (localStorage.getItem("token") || sessionStorage.getItem("token")) 
  const location = useLocation();

  const isAuthenticated = Boolean(user && token);  

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};