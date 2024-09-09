import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Profit_Hourly from "../Hatid_Bahay/Profit_Hourly";
import Profit_Daily from "../Hatid_Bahay/Profit_Daily";
import Profit_Monthly from "../Hatid_Bahay/Profit_Monthly";
import Calls_Hourly from "./Calls_Hourly";
import Calls_Daily from "./Calls_Daily";
import Calls_Monthly from "./Calls_Monthly";

function Calls() {
  const [radioVal, setRadioVal] = useState("hourly");
  const [content, setContent] = useState(<Profit_Hourly />);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRadioVal(newValue);

    switch (newValue) {
      case "hourly":
        setContent(<Calls_Hourly />);
        break;
      case "daily":
        setContent(<Calls_Daily />);
        break;
      case "monthly":
        setContent(<Calls_Monthly />);
        break;
      default:
        setContent(<Calls_Hourly />);
    }
  };
  return (
    <div className="w-full flex justify-center py-5 ">
      <div className=" w-full">
        <div className="bg-white rounded-lg">
          <div className="w-full pt-5 pl-10">
            <Typography>
              <b>Calls Received</b>
            </Typography>
          </div>
          <div className="flex gap-3">
            <div className="flex justify-center w-full">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={radioVal}
                  className="gap-10"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="hourly"
                    control={<Radio size="small" />}
                    label="Hourly"
                    defaultChecked
                    sx={{ marginRight: 2 }}
                  />
                  <FormControlLabel
                    value="daily"
                    control={<Radio size="small" />}
                    label="Daily"
                    sx={{ marginRight: 2 }}
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio size="small" />}
                    label="Monthly"
                    sx={{ marginRight: 2 }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="w-full">
            <div className="p-5">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calls;
