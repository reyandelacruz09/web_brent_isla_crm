import { Button, Typography } from "@mui/material";
import React from "react";
import Inventory_Summary from "./Inventory_Summary";
import Chart1 from "./Chart1";
import Profit from "./Profit";

const Dashboard_Content = () => {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("user_info") || "{}"
  );
  return (
    <>
      <div className="bg-slate-100">
        <div className="w-full pt-10 flex justify-center">
          <div className=" w-5/6">
            <div>
              <Typography variant="h5">
                <b>DASHBOARD</b>
              </Typography>
            </div>
          </div>
        </div>

        <Inventory_Summary />

        <Chart1 />

        <Profit />
      </div>
    </>
  );
};

export default Dashboard_Content;
