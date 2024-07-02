import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  series: number[];
  categories: string[];
}

const ApexChart: React.FC<ApexChartProps> = ({ series, categories }) => {
  const options = {
    xaxis: {
      categories,
    },
  };

  const chartSeries = [
    {
      name: "Data",
      data: series,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={chartSeries}
      type="bar"
      height={300}
    />
  );
};

export default ApexChart;
