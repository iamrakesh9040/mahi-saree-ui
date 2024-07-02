import React from "react";
import dynamic from "next/dynamic";
import "react-apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface LineChartProps {
  data: { x: string; y: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const series = [
    {
      data: data.map((point) => point.y),
    },
  ];
  const options = {
    xaxis: {
      categories: data.map((point) => point.x),
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={300}
    />
  );
};

export default LineChart;
