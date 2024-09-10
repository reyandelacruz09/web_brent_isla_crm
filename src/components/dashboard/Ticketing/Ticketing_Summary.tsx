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

function Ticketing_Summary() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [OpenTickets, setOpenTickets] = useSpring(() => ({
    number: 7,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [OnHoldTickets, setOnHoldTickets] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [OverdueTickets, setOverdueTickets] = useSpring(() => ({
    number: 2,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [DueToday, setDueToday] = useSpring(() => ({
    number: 2,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [UnassignedDue, setUnassignedDue] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [UnassignedTickets, setUnassignedTickets] = useSpring(() => ({
    number: 5,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalNewTickets, setTotalNewTickets] = useSpring(() => ({
    number: 563,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalOnHoldTickets, setTotalOnHoldTickets] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalClosedTickets, setTotalClosedTickets] = useSpring(() => ({
    number: 668,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalBacklogs, setTotalBacklogs] = useSpring(() => ({
    number: 668,
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
          <div className="bg-blue-500 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Open Tickets
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OpenTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              On-Hold Tickets
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OnHoldTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Overdue Tickets
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {OverdueTickets.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Due Today
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {DueToday.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Unassigned Due in 1 hour
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {UnassignedDue.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/6 h-28 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Unassigned Tickets
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {UnassignedDue.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
        </div>

        <div className="w-full flex p-3">
          <Typography>Ticket Status</Typography>
        </div>
        <div className="flex">
          <div className="w-1/4 pt-2 p-2">
            <Typography className="p-3 bg-blue-200 rounded-lg">
              <animated.span>
                {TotalNewTickets.number.to((n) => formatNumber1(n))}
              </animated.span>
              &nbsp; New Tickets (Total)
            </Typography>
          </div>
          <div className="w-1/4 pt-2 p-2">
            <Typography className="p-3 bg-red-200 rounded-lg">
              <animated.span>
                {TotalOnHoldTickets.number.to((n) => formatNumber1(n))}
              </animated.span>
              &nbsp; On-Hold Tickets (Total)
            </Typography>
          </div>
          <div className="w-1/4 pt-2 p-2">
            <Typography className="p-3 bg-green-200 rounded-lg">
              <animated.span>
                {TotalClosedTickets.number.to((n) => formatNumber1(n))}
              </animated.span>
              &nbsp; Closed Tickets (Total)
            </Typography>
          </div>
          <div className="w-1/4 pt-2 p-2">
            <Typography className="p-3 bg-purple-200 rounded-lg">
              <animated.span>
                {TotalBacklogs.number.to((n) => formatNumber1(n))}
              </animated.span>
              &nbsp; Backlogs Tickets (Total)
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticketing_Summary;
