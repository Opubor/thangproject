import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartdata, opt }) {
  return <Bar data={chartdata} options={opt} />;
}

export default BarChart;
