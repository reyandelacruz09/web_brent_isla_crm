import Modal_Create_Order from "../order/Modal_Create_Order";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import Table_All_History from "./Table_All_History";
import Table_Completed_History from "./Table_Completed_History";
import Table_Inquiries_History from "./Table_Inquiries_History";

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
export default function Order_History_Form() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center pt-5">
        <div className="w-5/6 flex justify-end gap-5">
          <SearchInput />
          <Modal_Create_Order />
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
              <Table_All_History />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Table_Completed_History />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Table_Inquiries_History />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}
