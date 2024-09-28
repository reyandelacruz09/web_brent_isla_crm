import { Button } from "@mui/material";
import React from "react";

function Promotion() {
  return (
    <>
      <div className="flex py-10 ">
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/promos/promo_1.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 p-10 pt-0">
          <div className="text-2xl">
            <b>
              Get 70% Savings on your refill plus a free Auto Shutoff regulator
            </b>
          </div>
          <div className="pt-3 text-md">
            Convert your non-Solane LPG cylinder together with your old
            regulator and get 70% Savings on your refill plus a free Auto
            Shutoff regulator. <br />
            Promo Mechanics: <br />
            &emsp;1. Conversion is open to all Metro Manila customers <br />{" "}
            &emsp;2. Promo runs from June 27 to 29, 2024 <br /> &emsp;3. Swap
            your non-Solane cylinders and get FREE ONE (1) A/S Regulator and 70%
            savings on Solane 11kg refill. <br /> &emsp;4. Available at all
            authorized Solane distributor showroom. <br />
            &emsp;5. Swapping conditions and delivery charges apply.
          </div>
          <div className="pt-5">
            <a
              href="https://www.facebook.com/SolaneManila/posts/pfbid02huNCyukyvKNxmgErWPPiBwL3yLXvhbDhfB24FNi8JDwafKRz1X5SdkNb4UjHVZKhl"
              target="_blank"
            >
              <Button variant="contained">Learn More</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="flex py-10">
        <div className="w-1/2 p-10 pt-0">
          <div className="text-2xl">
            <b>Birthday Promo! P100 off</b>
          </div>
          <div className="pt-3 text-md">
            If you’re using LPG at home and have a birthday coming up, Solane
            LPG has a special treat for you. With our birthday promo, you can
            make your birthday month even more memorable by getting enticing
            discounts with every purchase!
          </div>
          <div className="pt-5">
            <a
              href="https://solane.com.ph/2023/09/04/solane-lpg-birthday-promo-exclusive-discounts-to-celebrating-customers/"
              target="_blank"
            >
              <Button variant="contained">Learn More</Button>
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/promos/promo_2.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex pb-10">
        <div className="w-full">
          <img
            src="../../images/promos/promo_3.png"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}

export default Promotion;
