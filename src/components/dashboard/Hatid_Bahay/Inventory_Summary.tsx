import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useDashTotalProductsQuery } from "../../../store";

function Inventory_Summary() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [TotalNetSales, setTotalNetSales] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfTransactions, setNoOfTransactions] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [NoOfItems, setNoOfItems] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalRefunds] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalDiscount, setTotalDiscount] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [CostOfGoods, setCostOfGoods] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [Profit, setProfit] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [TotalOnlineOrders, setTotalOnlineOrders] = useSpring(() => ({
    number: 0,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  useEffect(() => {
    if (getInventorySummaryApi.isSuccess) {
      setTotalNetSales({
        ...TotalNetSales,
        number: getInventorySummaryApi.data?.data.TotalNetSales,
      });
      setNoOfTransactions({
        ...NoOfTransactions,
        number: getInventorySummaryApi.data?.data.NoOfTransactions,
      });
      setNoOfItems({
        ...NoOfItems,
        number: getInventorySummaryApi.data?.data.NoOfItems,
      });
      setTotalOnlineOrders({
        ...TotalOnlineOrders,
        number: getInventorySummaryApi.data?.data.TotalOnlineOrders,
      });
      setTotalDiscount({
        ...TotalDiscount,
        number: getInventorySummaryApi.data?.data.TotalDiscount,
      });
      setCostOfGoods({
        ...CostOfGoods,
        number: getInventorySummaryApi.data?.data.CostofGoods,
      });
      setProfit({
        ...Profit,
        number: getInventorySummaryApi.data?.data.Profit,
      });
      console.log("datas: ", getInventorySummaryApi.data?.data);
    }
  }, [getInventorySummaryApi.isSuccess, getInventorySummaryApi.data]);

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="w-full pt-2 flex justify-center">
      <div className=" w-full bg-white rounded-lg p-5">
        <Typography variant="h6">Inventory Summary</Typography>
        <div className="flex pt-3">
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">
                Total Net Sales
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {TotalNetSales.number.to((n) => formatNumber(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">
                No of Transactions
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {NoOfTransactions.number.to((n) => n.toFixed(0))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">No of Items</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {NoOfItems.number.to((n) => n.toFixed(0))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">Total Refunds</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {TotalRefunds.number.to((n) => n.toFixed(0))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">
                Total Discount
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {TotalDiscount.number.to((n) => n.toFixed(2))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">Cost of Goods</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {CostOfGoods.number.to((n) => formatNumber(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">Profit</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {Profit.number.to((n) => n.toFixed(2))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-1.5 rounded-lg">
              <Typography className="text-white pb-5">
                Total Online Orders
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>
                  <animated.span>
                    {TotalOnlineOrders.number.to((n) => n.toFixed(0))}
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

export default Inventory_Summary;
