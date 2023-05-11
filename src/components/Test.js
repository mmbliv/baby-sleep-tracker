import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Stack,
} from "recharts";

const data = [
  { name: "Group A", low: 10, high: 20 },
  { name: "Group B", low: 20, high: 30 },
  { name: "Group C", low: 30, high: 40 },
];

function StackedRangeChart() {
  return (
    <AreaChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Stack>
        <Area type="monotone" dataKey="high" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="low" stroke="#82ca9d" fill="#82ca9d" />
      </Stack>
    </AreaChart>
  );
}

export default StackedRangeChart;
