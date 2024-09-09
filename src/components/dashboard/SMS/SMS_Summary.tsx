import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useDashTotalProductsQuery } from "../../../store";

function SMS_Summary() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [TotalNetSales, setTotalNetSales] = useSpring(() => ({
    number: 1784,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfTransactions, setNoOfTransactions] = useSpring(() => ({
    number: 99,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfItems, setNoOfItems] = useSpring(() => ({
    number: 4.75,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalRefunds] = useSpring(() => ({
    number: 8,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalDiscount, setTotalDiscount] = useSpring(() => ({
    number: 1883,
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

  return (
    <div className="w-full pt-2 flex justify-center">
      <div className=" w-full bg-white rounded-lg p-5">
        <Typography variant="h6">
          <b className="text-blue-600">Solane Analytics Dashboard</b>
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Quick overview Dashboard of the Customer Analytics
        </Typography>

        <div className="pt-5 flex w-full">
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
        <div className="flex pt-3">
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Total Calls Answered
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {TotalNetSales.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Total Abandoned
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {NoOfTransactions.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Average Handle Time
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {NoOfItems.number.to((n) => formatNumber(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Average Waiting Time
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {TotalRefunds.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className=" w-full">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Total Calls Received
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
        <div className="flex">
          <div className=" w-1/3">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Answered Rate
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {CostOfGoods.number.to((n) => formatNumber(n))}
                  </animated.span>
                  %
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/3">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Abandoned Rate
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {Profit.number.to((n) => formatNumber(n))}
                  </animated.span>
                  %
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/3">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5 text-center">
                Average Talk Time
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {TotalOnlineOrders.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SMS_Summary;
