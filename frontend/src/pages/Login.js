import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = async () => {
      setIsLoading(true);
      setError(null);

      // bakend req to login 
      const response = await fetch("https://lingobackend.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Authstate ", json);
      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.log("error", json.error);
      }
      if (response.ok) {
        // save the user (jwt) in local storage
        localStorage.setItem("user", JSON.stringify(json)); // storing both email and token into local storage

        // update user state
        setUser(json);
        setIsLoading(false);
      }
    };
    await login();
  };

  return (
    <div className="flex justify-center flex-col">
      <form
        className="max-w-[400px] w-full mx-auto bg-[#f0e9ed] mt-20  rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-4xl text-black font-bold text-center mt-4">
          Login
        </h3>
        <div className="flex flex-col text-black py-2 m-8 ">
          <label className="font-bold">Email :</label>
          <input
            type="email"
            className="rounded-lg bg- mt-2 p-2 "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="flex flex-col text-black py-2 m-8">
          <label className="font-bold">Password :</label>
          <input
            type="password"
            className="p-2 rounded-lg mt-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="m-8">
          <button
            className="w-full rounded-lg font-bold  my-5 mb-1 py-2 bg-[#d1a5a5] hover:bg-[#c57c7c] shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Loging in...":"Login"}
          </button>
        </div>
        {error && (
          <div className=" text-[#ff3d3d] m-8 mt-[-1.2em] "> {error} </div>
        )}
      </form>
    </div>
  );
};

export default Login;
