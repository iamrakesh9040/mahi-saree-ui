import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartProps {
  chartData: {
    category: string;
    value: number;
  }[];
}

const ChartComponent: React.FC<ChartProps> = ({ chartData }) => {
  const labels = chartData.map((data) => data.category);
  const percentages = chartData.map((data) =>
    (
      (data.value / chartData.reduce((acc, curr) => acc + curr.value, 0)) *
      100
    ).toFixed(2)
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: labels,
  };

  const chartSeries = chartData.map((data) => data.value);

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        height={313}
      />
      {/* <div className="mt-4">
        <ul>
          {chartData.map((data, index) => (
            <li key={index} className="flex justify-between">
              <span>{data.category}</span>
              <span>{percentages[index]}%</span>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default ChartComponent;
