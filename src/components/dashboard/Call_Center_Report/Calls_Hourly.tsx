import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  LineChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

function Calls_Hourly() {
  const data = [
    { name: "12AM", profit: 2 },
    { name: "1AM", profit: 5.5 },
    { name: "2AM", profit: 2 },
    { name: "3AM", profit: 8.5 },
    { name: "4AM", profit: 1.5 },
    { name: "5AM", profit: 5 },
    { name: "6AM", profit: 2 },
    { name: "7AM", profit: 5.5 },
    { name: "8AM", profit: 2 },
    { name: "9AM", profit: 8.5 },
    { name: "10AM", profit: 1.5 },
    { name: "11AM", profit: 5 },
    { name: "12PM", profit: 2 },
    { name: "1PM", profit: 5.5 },
    { name: "2PM", profit: 2 },
    { name: "3PM", profit: 8.5 },
    { name: "4PM", profit: 1.5 },
    { name: "5PM", profit: 5 },
    { name: "6PM", profit: 2 },
    { name: "7PM", profit: 5.5 },
    { name: "8PM", profit: 2 },
    { name: "9PM", profit: 8.5 },
    { name: "10PM", profit: 1.5 },
    { name: "11PM", profit: 5 },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            style={{ fontSize: "12px" }}
            height={40}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Calls_Hourly;
