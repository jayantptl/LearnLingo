import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:4000/api/user/getLeaderboard"
        );
        const json = await response.json();
        setLeaders(json);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (!leaders) {
    return <Loading />;
  }

  return (
    leaders && (
      <div className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
        <div className="container mx-auto p-4  ">
          <h1 className="text-2xl flex justify-center  mb-4">Leaderboard</h1>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 ">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => {
                return (
                  <>
                    <tr className="bg-white">
                      <td className="border p-2 ">{index + 1}</td>
                      <td className="border p-2 ">{user.name}</td>
                      <td className="border p-2 ">{user.score.toFixed(2)}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default LeaderBoard;
