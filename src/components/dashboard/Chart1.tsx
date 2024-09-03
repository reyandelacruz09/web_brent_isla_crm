import React from "react";
import { Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart1() {
  const Products = [
    { name: "Product1", value: 4 },
    { name: "Product2", value: 3 },
    { name: "Product3", value: 6 },
    { name: "Product4", value: 7 },
    { name: "Product5", value: 8 },
    { name: "Product6", value: 3 },
    { name: "Product7", value: 9 },
    { name: "Product8", value: 15 },
    { name: "Product9", value: 20 },
    { name: "Product10", value: 3 },
  ];

  const PaymentType = [
    { name: "Cash", value: 16 },
    { name: "Gcash", value: 10 },
    { name: "PayMaya", value: 25 },
    { name: "Card", value: 5 },
  ];

  const PieData = [
    { name: "Cash", value: 16 },
    { name: "Gcash", value: 10 },
    { name: "PayMaya", value: 25 },
    { name: "Card", value: 5 },
  ];

  return (
    <div className="w-full pt-5 flex justify-center">
      <div className=" w-5/6 ">
        <div className="">
          <div className="flex gap-3">
            <div className="bg-white inline-block rounded-lg w-2/4">
              <div className="text-center py-4">
                <Typography>
                  <b>Top Product Transaction Count</b>
                </Typography>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  className=""
                  width={600}
                  height={300}
                  data={Products}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    style={{ fontSize: "10px" }}
                    height={40}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white inline-block rounded-lg w-1/4">
              <div className="text-center py-4">
                <Typography>
                  <b>Payment Type (TC)</b>
                </Typography>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  className=""
                  width={300}
                  height={300}
                  data={PaymentType}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    //   angle={-45}
                    textAnchor="middle"
                    style={{ fontSize: "12px" }}
                    height={40}
                  />
                  {/* <YAxis /> */}
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    <LabelList dataKey="value" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white inline-block rounded-lg w-1/4">
              <div className="text-center py-4">
                <Typography>
                  <b>Payment Type (Sales)</b>
                </Typography>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={PieData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {PieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index]
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="inside"
                      style={{
                        fill: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart1;
