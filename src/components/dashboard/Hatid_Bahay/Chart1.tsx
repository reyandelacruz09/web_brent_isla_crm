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
import { usePieChartQuery, useProductChartQuery } from "../../../store";

function Chart1() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getChart1Api = usePieChartQuery({
    branch: account_detailed1.branch.id,
  });
  const getProductChart = useProductChartQuery({
    branch: account_detailed1.branch.id,
  });

  const Products: any = [];
  const PaymentType: any = [];
  const PieData: any = [];

  const Products1: any = [
    {
      name: "Lays",
      value: 5,
      value1: 7,
    },
    {
      name: "Coke",
      value: 2,
      value1: 6,
    },
  ];
  if (getChart1Api.isSuccess) {
    const Data = getChart1Api.data?.data;

    Data.forEach((item: any) => {
      PaymentType.push({ name: item.name, value: item.value });
      PieData.push({ name: item.name, value: item.value });
    });
  }

  if (getProductChart.isSuccess) {
    const Data = getProductChart.data?.data;

    Data.forEach((item: any) => {
      Products.push({ name: item.name, value: item.value });
    });
  }

  return (
    <div className="w-full pt-5 flex justify-center">
      <div className=" w-full ">
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
                  width={500}
                  height={300}
                  data={Products}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                  <Bar dataKey="value" fill="#82ca9d" maxBarSize={50}>
                    <LabelList dataKey="value" position="top" />
                  </Bar>
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
                  width={300}
                  height={300}
                  data={PaymentType}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                  <Bar dataKey="value" fill="#8884d8" maxBarSize={50}>
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
                    {PieData.map((entry: any, index: any) => (
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
