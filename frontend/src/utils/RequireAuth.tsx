import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider"; 

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default RequireAuth;
