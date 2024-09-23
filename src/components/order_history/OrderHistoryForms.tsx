import Modal_Create_Order from "../order/Modal_Create_Order";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table_All_History from "./TableAllHistory";
import Table_Completed_History from "./TableCompletedHistory";
import Table_Inquiries_History from "./TableInquiriesHistory";
import { useState } from "react";

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
export default function OrderHistoryForm() {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center pt-5">
        <div className="w-5/6 flex justify-end gap-5">
          <div className="flex gap-5">
            <input
              type="text"
              id="input-group-1"
              name="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
              placeholder="Search"
              onChange={handleSearch}
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
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Completed" {...a11yProps(1)} />
                <Tab label="Inquiries and Complaints" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Table_All_History search={searchQuery} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Table_Completed_History search={searchQuery} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Table_Inquiries_History search={searchQuery} />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}