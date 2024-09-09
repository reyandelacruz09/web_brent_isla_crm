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

function Profit_Daily() {
  const data = [
    { name: "Sep 1", profit: 2 },
    { name: "Sep 2", profit: 5.5 },
    { name: "Sep 3", profit: 2 },
    { name: "Sep 4", profit: 8.5 },
    { name: "Sep 5", profit: 1.5 },
    { name: "Sep 6", profit: 5 },
    { name: "Sep 7", profit: 2 },
    { name: "Sep 8", profit: 5.5 },
    { name: "Sep 9", profit: 2 },
    { name: "Sep 10", profit: 8.5 },
    { name: "Sep 11", profit: 1.5 },
    { name: "Sep 12", profit: 5 },
    { name: "Sep 13", profit: 2 },
    { name: "Sep 14", profit: 5.5 },
    { name: "Sep 15", profit: 2 },
    { name: "Sep 16", profit: 8.5 },
    { name: "Sep 17", profit: 1.5 },
    { name: "Sep 18", profit: 5 },
    { name: "Sep 19", profit: 2 },
    { name: "Sep 20", profit: 5.5 },
    { name: "Sep 21", profit: 2 },
    { name: "Sep 22", profit: 8.5 },
    { name: "Sep 23", profit: 1.5 },
    { name: "Sep 24", profit: 5 },
    { name: "Sep 25", profit: 2 },
    { name: "Sep 26", profit: 5.5 },
    { name: "Sep 27", profit: 2 },
    { name: "Sep 28", profit: 8.5 },
    { name: "Sep 29", profit: 1.5 },
    { name: "Sep 30", profit: 5 },
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

export default Profit_Daily;
