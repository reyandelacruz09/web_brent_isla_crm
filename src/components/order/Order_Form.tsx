import Modal_Create_Order from "./Modal_Create_Order";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table_All_Orders from "./Table_All_Orders";
import Table_In_Transit from "./Table_In_Transit";
import Table_New_Orders from "./Table_New_Order";
import Table_Received from "./Table_Received";
import Table_Completed from "./Table_Completed";
import { Toaster } from "react-hot-toast";

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
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex justify-end">
            <div className="flex gap-5">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search"
              />
              <Modal_Create_Order />
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
                  <Tab label="All Orders" {...a11yProps(0)} />
                  <Tab label="New Order" {...a11yProps(1)} />
                  <Tab label="Received" {...a11yProps(2)} />
                  <Tab label="In-Transit" {...a11yProps(3)} />
                  <Tab label="Completed" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Table_All_Orders />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Table_New_Orders />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Table_Received />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Table_In_Transit />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <Table_Completed />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
