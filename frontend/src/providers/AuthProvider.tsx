import React, { createContext, useEffect, useState } from "react";

import { login as loginAction, logout as logoutAction } from "../store/actions/AuthAction";
import { useAppDispatch } from "../utils/reduxHook";
import { UserInfo } from "../types";

// Create a context to hold the authentication state and functions
export const AuthContext = createContext<any>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null); // Initialize user state with null or user data from local storage

  const dispatch = useAppDispatch();

  const setUserInContext = (userData: UserInfo) => {
    setUser(userData);
  };

  useEffect(() => {
    // Check local storage or make an API request to get the user"s authentication status
    const userFromLocalStorage = localStorage.getItem("userInfo");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const login = (userData: any) => {
    dispatch(loginAction(userData));

    setUser(userData);
  };

  const logout = () => {
    setUser(null);

    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, setUserInContext, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
