import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ExcerciseScore = () => {
  // componant to show current excercise score and details

  const { user } = useContext(AuthContext);
  const email = user.email;
  const [excerciseScore, setExcerciseScore] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const nevigate = useNavigate();

  const handleClick = () => {
    setIsShowing(true);
    nevigate("/englishquiz");
  };
  useEffect(() => {
    try {
      // backend req to fetch current excercise score
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:4000/api/user/getExcerciseScore",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const json = await response.json();
        setExcerciseScore(json.result);
        setFinalScore(json.finalScore);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (!excerciseScore) {
    return <Loading />;
  }

  return (
    excerciseScore && (
      <div>
        <h3 className="flex justify-center text-2xl font-bold  mt-4">
          Excercise Score
        </h3>

        <div class="max-w-4xl mx-auto mt-8 ">
          <table class="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question Difficulty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Attempted
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score percentage
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {excerciseScore.map((data) => {
                return (
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {data.difficulty}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{data.total}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{data.correct}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {data.scorePercentage.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <h1 className="text-2xl">
            Final Score :{" "}
            <span className="font-bold text-2xl">{finalScore.toFixed(2)} </span>{" "}
            out of 100
          </h1>
        </div>

        <div onClick={handleClick} className="flex justify-center mt-5">
          <button className="bg-[#c2a7a7] hover:bg-[#4d3e4b] hover:text-[#fff] rounded-lg px-8 py-3 font-bold ">
            {isShowing ? "Loading..." : "Attempt Next"}
          </button>
        </div>
      </div>
    )
  );
};

export default ExcerciseScore;
