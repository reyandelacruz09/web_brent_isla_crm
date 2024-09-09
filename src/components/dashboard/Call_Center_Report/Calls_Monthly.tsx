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

function Calls_Monthly() {
  const data = [
    { name: "Jan 2024", profit: 2 },
    { name: "Feb 2024", profit: 5.5 },
    { name: "Mar 2024", profit: 2 },
    { name: "Apr 2024", profit: 0 },
    { name: "May 2024", profit: 1.5 },
    { name: "Jun 2024", profit: 5 },
    { name: "Jul 2024", profit: 2 },
    { name: "Aug 2024", profit: 5.5 },
    { name: "Sep 2024", profit: 2 },
    { name: "Oct 2024", profit: 8.5 },
    { name: "Nov 2024", profit: 1.5 },
    { name: "Dec 2024", profit: 5 },
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
            height={50}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Calls_Monthly;
