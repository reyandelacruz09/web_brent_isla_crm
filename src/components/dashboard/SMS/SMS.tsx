import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SMS_Hourly from "./SMS_Hourly";
import SMS_Daily from "./SMS_Daily";
import SMS_Monthly from "./SMS_Monthly";

function SMS() {
  const [radioVal, setRadioVal] = useState("hourly");
  const [content, setContent] = useState(<SMS_Hourly />);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRadioVal(newValue);

    switch (newValue) {
      case "hourly":
        setContent(<SMS_Hourly />);
        break;
      case "daily":
        setContent(<SMS_Daily />);
        break;
      case "monthly":
        setContent(<SMS_Monthly />);
        break;
      default:
        setContent(<SMS_Hourly />);
    }
  };
  return (
    <div className="w-full flex justify-center py-5 ">
      <div className=" w-full">
        <div className="bg-white rounded-lg">
          <div className="w-full pt-5 pl-10">
            <Typography>
              <b>SMS</b>
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

export default SMS;
