import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthState = (props) => {
  // a global state - user , using context api

  const [user, setUser] = useState(null);
  // since this component is rendering first we can check here itself if user exists in local storage and update state
  // check once only so dependency array
  useEffect(() => {
    const chkUser = JSON.parse(localStorage.getItem("user"));
    if (chkUser) {
      setUser(chkUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
