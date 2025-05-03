// components/BookingBarChart.jsx
"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

const BookingBarChart = ({ options, series, categories }) => {
	return (
		<ReactApexChart options={options} series={series} type="bar" height={250} />
	);
};

export default BookingBarChart;
