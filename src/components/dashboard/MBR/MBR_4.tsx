import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useDashTotalProductsQuery } from "../../../store";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

function MBR_4() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [AIM, setAIM] = useSpring(() => ({
    number: 1083736,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [ARM, setARM] = useSpring(() => ({
    number: 862712,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [Reach, setReach] = useSpring(() => ({
    number: 10352544,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [EngagedUsers, setEngagedUsers] = useSpring(() => ({
    number: 889007,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [ReachAve, setReachAve] = useSpring(() => ({
    number: 921255,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [CompTotalPageLikes, setCompTotalPageLikes] = useSpring(() => ({
    number: 91,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [CompImpressions, setCompImpressions] = useSpring(() => ({
    number: 19085,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [CompReach, setCompReach] = useSpring(() => ({
    number: 11674,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [CompEngagedUsers, setCompEngagedUsers] = useSpring(() => ({
    number: 541,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

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
      <div className="w-full bg-white rounded-lg p-5">
        <div className="flex">
          {/* Column for Cards */}
          <div className="w-1/5 pr-2">
            <div className="bg-slate-400 w-full h-36 m-1.5 mb-3 rounded-lg flex flex-col items-center justify-center">
              <Typography
                className="text-white pb-2 text-center"
                variant="body2"
              >
                Average Impressions per Month (YTD)
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {AIM.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
            <div className="bg-blue-500 w-full h-36 m-1.5 rounded-lg flex flex-col items-center justify-center">
              <Typography
                className="text-white pb-2 text-center"
                variant="body2"
              >
                Average Reach per Month (YTD)
              </Typography>
              <Typography variant="h4" className="text-white text-center">
                <b>
                  <animated.span>
                    {ARM.number.to((n) => formatNumber1(n))}
                  </animated.span>
                </b>
              </Typography>
            </div>
          </div>

          {/* Sidebar or Additional Content */}
          <div className="w-4/5 mb-3 flex">
            <div className="bg-blue-500 h-full m-1.5 rounded-lg">
              <Typography className="p-3 text-white">
                Page Impression vs Reach
              </Typography>

              <img
                src="../../images/MBR_4.png"
                alt="OODC_Logo"
                className="w-full px-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBR_4;
