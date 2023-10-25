import React, { useState, useEffect, useContext } from "react";
import RatingChart from "./RatingChart";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const UserDashboard = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [dashBoardData, setDashBoardData] = useState(null);
  const [btnText, setBtnText] = useState("Resetting Data");
  const { user } = useContext(AuthContext);
  const nevigate = useNavigate();
  const email = user.email;

  // get user dashboard
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:4000/api/user/getDashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const json = await response.json();
        setDashBoardData(json);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleClick = () => {
    setIsShowing(true);

    if (btnText === "Start Learning") {
      nevigate("/");
    }
    try {
      // to reset all the data of the excerxise attempted so far

      const resetData = async () => {
        const response = await fetch(
          "http://localhost:4000/api/user/resetData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const json = await response.json();
        setDashBoardData(json);
        setBtnText("Start Learning");
      };
      resetData();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!dashBoardData) {
    return <Loading />;
  }
  return (
    dashBoardData && (
      <div className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
        <div className="container mx-auto p-4">
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Name:</label>
                <p className="text-gray-800">{dashBoardData.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Email:</label>
                <p className="text-gray-800">{dashBoardData.email}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Current Score:{" "}
                </label>
                <p className="text-gray-800">
                  {dashBoardData.finalScore.toFixed(2)} (out of 100)
                </p>
              </div>
            </div>
          </div>
          <RatingChart scorePercentage={dashBoardData.scorePercentage} />
          <div onClick={handleClick} className="flex justify-center mt-5">
            <button className="bg-[#c2a7a7] hover:bg-[#4d3e4b] hover:text-[#fff] rounded-lg px-8 py-3 font-bold ">
              {isShowing ? btnText : "Reset Data"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserDashboard;
