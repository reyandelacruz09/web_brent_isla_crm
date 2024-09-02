import { Button, Typography } from "@mui/material";
import React from "react";

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
        <div className="w-full pt-2 flex justify-center">
          <div className=" w-5/6 bg-white rounded-lg p-5">
            <Typography variant="h6">Inventory Summary</Typography>
            <div className="flex pt-3">
              <div className="p-2">
                <img src="../../images/dashboard/1/1.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/2.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/3.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/4.png" />
              </div>
            </div>
            <div className="flex">
              <div className="p-2">
                <img src="../../images/dashboard/1/5.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/6.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/7.png" />
              </div>
              <div className="p-2">
                <img src="../../images/dashboard/1/8.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pt-5 flex justify-center">
          <div className=" w-5/6 ">
            <div className="">
              <div className="flex gap-3">
                <div className="">
                  <img src="../../images/dashboard/2/1.png" />
                </div>
                <div className="">
                  <img src="../../images/dashboard/2/2.png" />
                </div>
                <div className="">
                  <img src="../../images/dashboard/2/3.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className=" w-5/6">
            <div className="">
              <div className="flex pt-3 gap-3">
                <div className="">
                  <img src="../../images/dashboard/3/1.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center pb-10">
          <div className=" w-5/6">
            <div className="">
              <div className="flex pt-3 gap-3">
                <div className="">
                  <img src="../../images/dashboard/3/2.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_Content;
