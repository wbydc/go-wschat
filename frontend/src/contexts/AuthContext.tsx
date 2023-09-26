import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}


export function AuthProvider({children}) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>
}
