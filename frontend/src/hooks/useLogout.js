import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogout = () => {
  
  const { setUser } = useContext(AuthContext);

  const logout = () => {
    // remove user (emil & token) from local storage
    localStorage.removeItem("user");

    // mark the global state user null
    setUser(null);
  };

  return { logout };
};
