import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
