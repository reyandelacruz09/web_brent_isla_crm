import React from "react";
import "../../App.css";
import { Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FAQ from "./FAQ";
import Promotion from "./Promotion";
import Announcement from "./Announcement";
import Troubleshooting from "./Troubleshooting";
import SearchKB from "./SearchKB";

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

function KBDetails() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="">
        <div className="w-full pt-10 flex justify-center">
          <div className="kbImage">
            <div className="rectangle1"></div>
            <div className="rectangle2"></div>
            <img
              src="../../images/avatar_1.png"
              alt=""
              className="w-full avatar_1"
            />
            <img
              src="../../images/avatar_2.png"
              alt=""
              className="w-full avatar_2"
            />
            <img
              src="../../images/avatar_3.png"
              alt=""
              className="w-full avatar_3"
            />
            <div className="">
              <div className="pt-16 text-center">
                <a className="text-5xl font-bold text-white">Get Started!</a>
                <br /> <br />
                <a className="text-xl text-gray-200">
                  Utilize digital calendars or scheduling apps to keep track of
                  your appointments, <br /> deadlines, and events. These tools
                  often reminders and <br /> can sync across multiple devices,
                  ensuring you stay on top of your schedule
                </a>
                <br /> <br />
                <Button variant="contained" size="large" className="text-white">
                  Sign Up
                </Button>
                <br /> <br /> <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-5/6 pt-10 flex justify-end">
          {/* <SearchKB /> */}
          <input
            type="text"
            id="input-group-1"
            name="discount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-5/6 pt-10">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="FAQ" {...a11yProps(0)} />
                <Tab label="Promos" {...a11yProps(1)} />
                <Tab label="Announcements" {...a11yProps(2)} />
                <Tab label="Troubleshooting" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <FAQ />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Promotion />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Announcement />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Troubleshooting />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}

export default KBDetails;
