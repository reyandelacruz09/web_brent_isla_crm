import { Typography } from "@mui/material";
import React from "react";

function Inventory_Summary() {
  return (
    <div className="w-full pt-2 flex justify-center">
      <div className=" w-5/6 bg-white rounded-lg p-5">
        <Typography variant="h6">Inventory Summary</Typography>
        <div className="flex pt-3">
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">
                Total Net Sales
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>100,000.00</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">
                No of Transactions
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>1,000</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">No of Items</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>40</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">Total Refunds</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>0</b>
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">
                Total Discount
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>0</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">Cost of Goods</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>90</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-slate-400 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">Profit</Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>3</b>
              </Typography>
            </div>
          </div>
          <div className=" w-1/4">
            <div className="bg-blue-500 p-5 m-3 rounded-lg">
              <Typography className="text-white pb-5">
                Total Online Orders
              </Typography>
              <Typography variant="h4" className="text-white text-right">
                <b>8</b>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory_Summary;
