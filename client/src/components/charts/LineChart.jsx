import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartdata, opt }) {
  return <Line data={chartdata} options={opt} />;
}

export default LineChart;
