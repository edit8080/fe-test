import { Cell, Pie, PieChart, Tooltip } from "recharts";

import React from "react";

function DataPieChart({ data, dataKey }) {
  const chartColors = ["#d35400", "#f1c40f", "#27ae60", "#2980b9", "#8e44ad"];

  return (
    <>
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}
export default DataPieChart;
