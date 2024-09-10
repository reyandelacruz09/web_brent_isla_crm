import { Button, Typography } from "@mui/material";
import React from "react";
import Inventory_Summary from "./Hatid_Bahay/Inventory_Summary";
import Chart1 from "./Hatid_Bahay/Chart1";
import Profit from "./Hatid_Bahay/Profit";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Calls from "./Call_Center_Report/Calls";
import Calls_Summary from "./Call_Center_Report/Calls_Summary";
import SMS_Summary from "./SMS/SMS_Summary";
import SMS from "./SMS/SMS";
import Ticketing_Summary from "./Ticketing/Ticketing_Summary";
import Chart_Bar_Line from "./Ticketing/Chart_Bar_Line";
import Chart_Pie from "./Ticketing/Chart_Pie";
import Ticketing_Hour from "./Ticketing/Ticketing_Hour";
import MBR_Summary from "./MBR/MBR_Summary";
import MBR_Bar_Year from "./MBR/MBR_Bar_Year";
import MBR_3 from "./MBR/MBR_3";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Dashboard_Content() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="w-full bg-gray-50">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex justify-start">
            <div className="flex gap-5">
              <Typography variant="h6">
                <b>DASHBOARD</b>
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="my-5 p-2 w-5/6">
            {" "}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Hatid Bahay" {...a11yProps(0)} />
                  <Tab label="Call Center Report" {...a11yProps(1)} />
                  <Tab label="SMS" {...a11yProps(2)} />
                  <Tab label="Ticketing" {...a11yProps(3)} />
                  <Tab label="MBR" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Inventory_Summary />
                <Chart1 />
                <Profit />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Calls_Summary />
                <Calls />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <SMS_Summary />
                <SMS />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Ticketing_Summary />
                <Chart_Bar_Line />
                <Chart_Pie />
                <Ticketing_Hour />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <MBR_Summary />
                <MBR_Bar_Year />
                <MBR_3 />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>

      {/*       
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
      </div> */}
    </>
  );
}

export default Dashboard_Content;
