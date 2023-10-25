import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


// to plot difficulty vs percentage Score 
const RatingChart = ({ scorePercentage }) => {
  const state = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Difficulty vs Score (out of 100)",
        backgroundColor: "#4d3e4b",
        borderColor: "#000",
        borderWidth: 2,
        data: [
          // score percentage of different difficluties i.e. (correct/total) * 100
          scorePercentage[1],
          scorePercentage[2],
          scorePercentage[3],
          scorePercentage[4],
          scorePercentage[5],
        ],
      },
    ],
  };

  return (
    <div>
      <div className="px-40 mt-10 bg-[#faf7f7] font-bold">
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Score",
              fontSize: 30,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default RatingChart;
