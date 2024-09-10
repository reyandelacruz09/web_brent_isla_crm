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

function MBR_3() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getInventorySummaryApi = useDashTotalProductsQuery({
    branch: account_detailed1.branch.id,
  });

  const [TotalPageLikes, setTotalPageLikes] = useSpring(() => ({
    number: 201847,
    from: { number: 0 },
    config: { duration: 2000 },
  }));
  const [Impressions, setImpressions] = useSpring(() => ({
    number: 13004828,
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
      <div className=" w-full bg-white rounded-lg p-5">
        <div className="w-full flex">
          <div className="bg-slate-400 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Total Page Likes
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {TotalPageLikes.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Impressions (YTD)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {Impressions.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Reach (YTD)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {Reach.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-3 text-center" variant="body2">
              Engaged Users (YTD)
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {EngagedUsers.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-1 text-center" variant="body2">
              Reach Dec 2022 vs Average
            </Typography>
            <Typography
              variant="h4"
              className="text-white text-center flex place-content-center"
            >
              <GaugeContainer
                width={200}
                height={100}
                startAngle={-110}
                endAngle={110}
                value={90}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
            </Typography>
          </div>
        </div>

        <div className="w-full flex">
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography
              className="text-white text-center"
              sx={{ fontSize: "12px" }}
            >
              <b>Likes - Prev Month vs Latest Month</b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              Dec 2023: 1724
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {CompTotalPageLikes.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              % of Difference From: -94.7%
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography
              className="text-white text-center"
              sx={{ fontSize: "12px" }}
            >
              <b>Impressions - Prev Month vs Latest Month</b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              Dec 2023: 2316649
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {CompImpressions.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              % of Difference From: -99.2%
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography
              className="text-white text-center"
              sx={{ fontSize: "12px" }}
            >
              <b>Reach - Prev Month vs Latest Month</b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              Dec 2023: 1872383
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {CompReach.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              % of Difference From: -99.4%
            </Typography>
          </div>
          <div className="bg-blue-500 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography
              className="text-white text-center"
              sx={{ fontSize: "12px" }}
            >
              <b>Engaged Users - Prev Month vs Latest Month</b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              Dec 2023: 82383
            </Typography>
            <Typography variant="h4" className="text-white text-center">
              <b>
                <animated.span>
                  {CompEngagedUsers.number.to((n) => formatNumber1(n))}
                </animated.span>
              </b>
            </Typography>
            <Typography
              className="text-white pb-2 text-center"
              sx={{ fontSize: "12px" }}
            >
              % of Difference From: -99.3%
            </Typography>
          </div>
          <div className="bg-slate-400 w-1/3 h-36 m-1.5 rounded-lg place-content-center">
            <Typography className="text-white pb-1 text-center" variant="body2">
              Engagement Dec 2022 vs Average
            </Typography>
            <div className="bg-red-100 flex relative items-center justify-center">
              <div className="w-1/4 bg-red-400 h-12">&nbsp;a</div>
              <div className="w-1/4 bg-yellow-400 h-12">&nbsp;v</div>
              <div className="w-2/4 bg-green-400 h-12">&nbsp;z</div>
              <div
                className="absolute bg-gray-500 h-8 inset-x-0 flex items-center justify-end pr-1"
                style={{ width: "90%" }}
              >
                <Typography variant="body2" color="white">
                  89,485
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBR_3;
