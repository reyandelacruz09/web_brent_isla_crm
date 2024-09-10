import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useDashTotalProductsQuery } from "../../../store";
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

function SMS_Summary() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [TotalNetSales, setTotalNetSales] = useSpring(() => ({
    number: 173,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfTransactions, setNoOfTransactions] = useSpring(() => ({
    number: 131,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfItems, setNoOfItems] = useSpring(() => ({
    number: 42,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalRefunds] = useSpring(() => ({
    number: 5,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalDiscount, setTotalDiscount] = useSpring(() => ({
    number: 42,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [CostOfGoods, setCostOfGoods] = useSpring(() => ({
    number: 94.7,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [Profit, setProfit] = useSpring(() => ({
    number: 5.3,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalOnlineOrders, setTotalOnlineOrders] = useSpring(() => ({
    number: 285,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  //   useEffect(() => {
  //     if (getInventorySummaryApi.isSuccess) {
  //       setTotalNetSales({
  //         ...TotalNetSales,
  //         number: getInventorySummaryApi.data?.data.TotalNetSales,
  //       });
  //       setNoOfTransactions({
  //         ...NoOfTransactions,
  //         number: getInventorySummaryApi.data?.data.NoOfTransactions,
  //       });
  //       setNoOfItems({
  //         ...NoOfItems,
  //         number: getInventorySummaryApi.data?.data.NoOfItems,
  //       });
  //       setTotalOnlineOrders({
  //         ...TotalOnlineOrders,
  //         number: getInventorySummaryApi.data?.data.TotalOnlineOrders,
  //       });
  //       setTotalDiscount({
  //         ...TotalDiscount,
  //         number: getInventorySummaryApi.data?.data.TotalDiscount,
  //       });
  //       setCostOfGoods({
  //         ...CostOfGoods,
  //         number: getInventorySummaryApi.data?.data.CostofGoods,
  //       });
  //       setProfit({
  //         ...Profit,
  //         number: getInventorySummaryApi.data?.data.Profit,
  //       });
  //       console.log("datas: ", getInventorySummaryApi.data?.data);
  //     }
  //   }, [getInventorySummaryApi.isSuccess, getInventorySummaryApi.data]);

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };
  const formatNumber1 = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const PieData: any = [
    {
      name: "Order Completed",
      value: 131,
    },
    {
      name: "Inquiry",
      value: 42,
    },
    {
      name: "Complaint",
      value: 5,
    },
    {
      name: "No Status",
      value: 42,
    },
  ];

  return (
    <div className="w-full pt-2 flex justify-center">
      <div className=" w-full bg-white rounded-lg p-5">
        <Typography variant="h6">
          <b className="text-blue-600">Solane Analytics Dashboard</b>
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Quick overview Dashboard of the Customer Analytics
        </Typography>

        <div className="py-5 flex w-full">
          <div className="">
            <Typography variant="body2" className="text-gray-500">
              Filter:
            </Typography>
          </div>
          <div className=" pl-10">
            <Typography variant="body2" className="text-gray-500">
              Date
            </Typography>
            <select className="w-32 bg-gray-200">
              <option>--------</option>
            </select>
          </div>
          <div className=" pl-10">
            <Typography variant="body2" className="text-gray-500">
              Month
            </Typography>
            <select className="w-32 bg-gray-200">
              <option>All</option>
            </select>
          </div>
          <div className=" pl-10">
            <Typography variant="body2" className="text-gray-500">
              Sales Channel
            </Typography>
            <select className="w-32 bg-gray-200">
              <option>All</option>
            </select>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2">
            <div className="bg-blue-500 m-1.5 rounded-lg h-28 place-content-center">
              <Typography className="text-white pb-3 text-center">
                Total SMS Notification
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {TotalNetSales.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
            <div className="flex">
              <div className="bg-blue-500 w-1/2 h-28 m-1.5 rounded-lg place-content-center">
                <Typography className="text-white pb-3 text-center">
                  Order Completed
                </Typography>
                <Typography variant="h4" className="text-white text-center">
                  <b>
                    <animated.span>
                      {NoOfTransactions.number.to((n) => formatNumber1(n))}
                    </animated.span>
                  </b>
                </Typography>
              </div>
              <div className="bg-slate-400 w-1/2 h-28 m-1.5 rounded-lg place-content-center">
                <Typography className="text-white pb-3 text-center">
                  Inquiry
                </Typography>
                <Typography variant="h4" className="text-white text-center">
                  <b>
                    <animated.span>
                      {NoOfItems.number.to((n) => formatNumber1(n))}
                    </animated.span>
                  </b>
                </Typography>
              </div>
            </div>

            <div className="flex">
              <div className="bg-slate-400 w-1/2 h-28 m-1.5 rounded-lg place-content-center">
                <Typography className="text-white pb-3 text-center">
                  Complaint
                </Typography>
                <Typography variant="h4" className="text-white text-center">
                  <b>
                    <animated.span>
                      {TotalRefunds.number.to((n) => formatNumber1(n))}
                    </animated.span>
                  </b>
                </Typography>
              </div>
              <div className="bg-blue-500 w-1/2 h-28 m-1.5 rounded-lg place-content-center">
                <Typography className="text-white pb-3 text-center">
                  Invalid SMS
                </Typography>
                <Typography variant="h4" className="text-white text-center">
                  <b>
                    <animated.span>
                      {TotalDiscount.number.to((n) => formatNumber1(n))}
                    </animated.span>
                  </b>
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <Typography className="p-3">
                <b>Status Chart</b>
              </Typography>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={PieData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
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

export default SMS_Summary;
