import { Button } from "@mui/material";
import React from "react";

function Promotion() {
  return (
    <>
      <div className="flex pb-10">
        <div className="w-1/2">
          <img src="../../images/promotion_1.png" alt="" className="w-full" />
        </div>
        <div className="w-1/2 p-10">
          <div className="text-2xl">Promotion Title</div>
          <div className="text-xl pt-10">
            Et ipsum irure amet cupidatat mollit exercitation consequat duis
            aliquip. Reprehenderit Lorem veniam pariatur esse pariatur in aute
            tempor au
          </div>
          <div className="text-gray-600 pt-8">
            *Velit deserunt elit proident velit anim adipisicing
          </div>
          <div className="pt-5">
            <Button variant="contained">Shop Now</Button>
          </div>
        </div>
      </div>

      <div className="flex pb-10">
        <div className="w-1/2 p-10">
          <div className="text-2xl">Promotion Title</div>
          <div className="text-xl pt-10">
            Et ipsum irure amet cupidatat mollit exercitation consequat duis
            aliquip. Reprehenderit Lorem veniam pariatur esse pariatur in aute
            tempor au
          </div>
          <div className="text-gray-600 pt-8">
            *Velit deserunt elit proident velit anim adipisicing
          </div>
          <div className="pt-5">
            <Button variant="contained">Shop Now</Button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="../../images/promotion_2.png" alt="" className="w-full" />
        </div>
      </div>

      <div className="flex pb-10">
        <div className="w-full">
          <img src="../../images/promotion_3.png" alt="" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default Promotion;
