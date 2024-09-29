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
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [radioVal, setRadioVal] = useState("");
  const [radioValRT, setRadioValRT] = useState("bulk");
  const [RT, setRT] = useState("");
  const [disabledRT, setDisabledRT] = useState(true);

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const ownerid = account_detailed1.department.id;

  React.useEffect(() => {
    if (ownerid === 4) {
      setDisabledRT(false);
      setRadioVal("rt");
    } else {
      setDisabledRT(true);
      setRadioVal("hb");
      setRT("hidden");
    }
  }, [ownerid]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    switch (newValue) {
      case "rt":
        setRT("");
        setRadioVal("rt");
        break;
      default:
        setRT("hidden");
        setRadioVal("hb");
        setRadioValRT("bulk");
        break;
    }
  };

  const handleSelectRT = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    switch (newValue) {
      case "bulk":
        setRadioValRT("bulk");
        break;
      default:
        setRadioValRT("nads");
        break;
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex  gap-5">
            <div className="flex justify-start gap-5 w-1/2">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={radioVal}
                  className="gap-5 px-2 border rounded-lg border-blue-600"
                  onChange={handleSelect}
                >
                  <FormControlLabel
                    value="hb"
                    control={
                      <Radio
                        size="small"
                        style={{ transform: "scale(0.9)", margin: "0" }}
                      />
                    }
                    label={
                      <span className="text-sm text-slate-600">
                        Hatid Bahay
                      </span>
                    }
                    defaultChecked
                    className=""
                    sx={{ marginRight: 1 }}
                  />
                  <FormControlLabel
                    disabled={disabledRT}
                    value="rt"
                    control={<Radio size="small" />}
                    label={
                      <span className="text-sm text-slate-600">
                        Road Transport
                      </span>
                    }
                    className=""
                    sx={{ marginRight: 1 }}
                  />
                </RadioGroup>
              </FormControl>
              <div className={RT}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={radioValRT}
                    className="gap-5 px-2 border rounded-lg border-blue-600"
                    onChange={handleSelectRT}
                  >
                    <FormControlLabel
                      value="bulk"
                      control={
                        <Radio
                          size="small"
                          style={{ transform: "scale(0.9)", margin: "0" }}
                        />
                      }
                      label={
                        <span className="text-sm text-slate-600">Bulk</span>
                      }
                      className=""
                      sx={{ marginRight: 1 }}
                    />
                    <FormControlLabel
                      value="nads"
                      control={<Radio size="small" />}
                      label={
                        <span className="text-sm text-slate-600">NADS</span>
                      }
                      className=""
                      sx={{ marginRight: 1 }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="flex justify-end gap-5 w-1/2">
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
                  <Tab label="All Orders" {...a11yProps(0)} />
                  <Tab label="New Order" {...a11yProps(1)} />
                  <Tab label="Received" {...a11yProps(2)} />
                  <Tab label="In-Transit" {...a11yProps(3)} />
                  <Tab label="Completed" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Table_All_Orders
                  search={searchQuery}
                  radioVal={radioVal}
                  radioValRT={radioValRT}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Table_New_Orders
                  search={searchQuery}
                  radioVal={radioVal}
                  radioValRT={radioValRT}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Table_Received
                  search={searchQuery}
                  radioVal={radioVal}
                  radioValRT={radioValRT}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Table_In_Transit
                  search={searchQuery}
                  radioVal={radioVal}
                  radioValRT={radioValRT}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <Table_Completed
                  search={searchQuery}
                  radioVal={radioVal}
                  radioValRT={radioValRT}
                />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
