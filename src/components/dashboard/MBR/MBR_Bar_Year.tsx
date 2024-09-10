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

function MBR_Bar_Year() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getChart1Api = usePieChartQuery({
    branch: account_detailed1.branch.id,
  });
  const getProductChart = useProductChartQuery({
    branch: account_detailed1.branch.id,
  });

  const Products: any = [
    {
      name: "Jan 2022",
      value: 23903,
      value1: 11505,
    },
    {
      name: "Feb 2022",
      value: 23638,
      value1: 0,
    },
    {
      name: "Mar 2022",
      value: 29684,
      value1: 8087,
    },
    {
      name: "Apr 2022",
      value: 28154,
      value1: 0,
    },
    {
      name: "May 2022",
      value: 46905,
      value1: 10089,
    },
    {
      name: "Jun 2022",
      value: 32677,
      value1: 11883,
    },
    {
      name: "Jul 2022",
      value: 105510,
      value1: 10900,
    },
    {
      name: "Aug 2022",
      value: 14230,
      value1: 10122,
    },
    {
      name: "Sep 2022",
      value: 13017,
      value1: 10172,
    },
    {
      name: "Oct 2022",
      value: 19476,
      value1: 10436,
    },
    {
      name: "Nov 2022",
      value: 13165,
      value1: 11658,
    },
    {
      name: "Dec 2022",
      value: 12926,
      value1: 11929,
    },
  ];

  //   if (getChart1Api.isSuccess) {
  //     const Data = getChart1Api.data?.data;

  //     Data.forEach((item: any) => {
  //       PaymentType.push({ name: item.name, value: item.value });
  //       PieData.push({ name: item.name, value: item.value });
  //     });
  //   }

  //   if (getProductChart.isSuccess) {
  //     const Data = getProductChart.data?.data;

  //     Data.forEach((item: any) => {
  //       Products.push({ name: item.name, value: item.value });
  //     });
  //   }

  return (
    <div className="w-full pt-5 flex justify-center">
      <div className=" w-full ">
        <div className="">
          <div className="flex gap-3">
            <div className="bg-white inline-block rounded-lg w-full">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  className=""
                  width={500}
                  height={300}
                  data={Products}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    style={{ fontSize: "10px" }}
                    height={40}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    stackId={1}
                    fill="#758FE6FF"
                    maxBarSize={60}
                  >
                    <LabelList
                      dataKey="value"
                      position="center"
                      formatter={(value: any) => value.toLocaleString()}
                      style={{
                        fill: "black",
                        fontSize: "14px",
                      }}
                    />
                  </Bar>
                  <Bar
                    dataKey="value1"
                    stackId={1}
                    fill="#87DDC9FF"
                    maxBarSize={60}
                  >
                    <LabelList
                      dataKey="value1"
                      position="center"
                      formatter={(value: any) => value.toLocaleString()}
                      style={{
                        fill: "black",
                        fontSize: "14px",
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBR_Bar_Year;
