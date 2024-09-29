import { Button } from "@mui/material";
import React from "react";

function Announcement() {
  return (
    <>
      <div className="flex py-10 ">
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/announcement/announcement_1.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 p-10 pt-0">
          <div className="text-2xl">
            <b>Saktong Adventure Buddy</b>
          </div>
          <div className="pt-3 text-md">
            Planning an adventure soon? Bring along Solane Sakto 1.4kg.
            Conveniently safe and sakto for outdoor or indoor use! Know more
            about the Solane Sakto 1.4kg: https://solane.com.ph/our-products/
          </div>
          <div className="pt-5">
            <a
              href="https://www.facebook.com/share/p/GvgV35Yx4AVprN4V/"
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
            <b>Championing LPG industry standards for 25 years</b>
          </div>
          <div className="pt-3 text-md">
            Solane has been a proud pioneer member of the LPG Industry
            Association (LPGIA) since its establishment in 1999. Together with
            other trusted LPG brands, we uphold the quality, safety, and
            excellence of the LPG industry in the Philippines.
          </div>
          <div className="pt-5">
            <a
              href="https://www.facebook.com/share/p/W4L1x25XY2nXocuV/"
              target="_blank"
            >
              <Button variant="contained">Learn More</Button>
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/announcement/announcement_2.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex py-10 ">
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/announcement/announcement_3.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 p-10 pt-0">
          <div className="text-2xl">
            <b>Libreng Konsulta at Gamot</b>
          </div>
          <div className="pt-3 text-md">
            Solane LPG helped deliver peace of mind to the community of Barangay
            Libjo in partnership with the government of Batangas City. A medical
            mission was held last Jun 29 providing more than 500 individuals
            with general checkups.
          </div>
          <div className="pt-5">
            <a
              href="https://www.facebook.com/share/p/sRLgG7sTzV8bztZq/"
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
            <b>Empowering women, empowering homes!</b>
          </div>
          <div className="pt-3 text-md">
            Empowering women, empowering homes! Solane LPG proudly supported The
            Manila Times Women's Forum at Okada Manila last March 14, 2024,
            themed 'Inspiring Inclusivity: Our Collective Responsibility' in
            celebration of Women's Month. #SolaneLPG #InternationalWomensMonth
          </div>
          <div className="pt-5">
            <a
              href="https://www.facebook.com/share/p/KWB5tpPwzZd6x3Fz/"
              target="_blank"
            >
              <Button variant="contained">Learn More</Button>
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <div className="h-full">
            <img
              src="../../images/announcement/announcement_4.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
