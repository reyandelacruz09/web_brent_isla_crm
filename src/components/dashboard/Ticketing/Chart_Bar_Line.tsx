import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { LabelList } from "recharts";

const dataset = [
  { min: 107, precip: 112, month: "Sep 2" },
  { min: 115, precip: 120, month: "Sep 3" },
  { min: 98, precip: 103, month: "Sep 4" },
  { min: 113, precip: 118, month: "Sep 5" },
  { min: 121, precip: 126, month: "Sep 6" },
  { min: 76, precip: 81, month: "Sep 7" },
  { min: 3, precip: 8, month: "Sep 8" },
];

const series: any = [
  { type: "line", dataKey: "min", color: "#577399" },
  { type: "bar", dataKey: "precip", color: "#bfdbf7", yAxisId: "rightAxis" },
];

function Chart_Bar_Line() {
  const [reverseX, setReverseX] = React.useState(false);
  const [reverseLeft, setReverseLeft] = React.useState(false);
  const [reverseRight, setReverseRight] = React.useState(false);

  return (
    <Stack sx={{ width: "100%" }} className="bg-white mt-5 rounded-lg">
      <Box sx={{ width: "100%" }}>
        <ResponsiveChartContainer
          series={series}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              label: "Month",
              reverse: reverseX,
            },
          ]}
          yAxis={[
            { id: "leftAxis", reverse: reverseLeft },
            { id: "rightAxis", reverse: reverseRight },
          ]}
          dataset={dataset}
          height={400}
        >
          <ChartsGrid horizontal />
          <BarPlot />
          <LinePlot />
          <MarkPlot />

          <ChartsXAxis />
          <ChartsYAxis axisId="leftAxis" />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
}

export default Chart_Bar_Line;
