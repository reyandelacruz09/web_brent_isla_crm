import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useDashTotalProductsQuery } from "../../../store";

function MBR_Summary() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [OpenTickets, setOpenTickets] = useSpring(() => ({
    number: 33543,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [OnHoldTickets, setOnHoldTickets] = useSpring(() => ({
    number: 27370,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [OverdueTickets, setOverdueTickets] = useSpring(() => ({
    number: 3292,
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
          <div className="bg-blue-500 w-1/3 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              YTD Outgoing SMS (2023)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OpenTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/3 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              YTD Incoming SMS (2023)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OnHoldTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Max (8:00AM-8:29AM)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OverdueTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBR_Summary;
