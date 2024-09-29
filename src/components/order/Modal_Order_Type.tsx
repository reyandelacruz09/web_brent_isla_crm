import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Checkbox, FormControlLabel } from "@mui/material";

type OrderType = {
  demographic: string;
  rt_type: string;
  order_type: string;
  call_type: string;
  type_of_complaint: string;
  reason_cancell: string;
};

type OwnerType = {
  ownerType: string;
};

type OrderTypeProps = {
  orderType: OrderType;
  setOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
  ownerType: OwnerType;
};

function Modal_Order_Type({
  orderType,
  setOrderType,
  ownerType,
}: OrderTypeProps) {
  const [value, setValue] = React.useState("callType");
  const [otypeCall, setotypeCall] = React.useState("");
  const [otypeComplaint, setotypeComplaint] = React.useState("hidden");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrderType((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "order_type") {
      setValue(value);
      if (value === "1") {
        setotypeCall("");
        setotypeComplaint("hidden");
        setOrderType({
          ...orderType,
          order_type: "1",
          reason_cancell: "0",
          type_of_complaint: "0",
        });
      } else {
        setotypeComplaint("");
        setotypeCall("hidden");
      }
    }
  };

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setOrderType({
      ...orderType,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <>
      <div className="grid grid-cols-5">
        {ownerType.ownerType === "2" ? (
          <div className="pr-3">
            <FormControl className="w-full">
              <FormLabel id="demo-row-radio-buttons-group-label">
                <span className="text-md font-bold text-slate-900">Type</span>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="rt_type"
                className="border-2 border-blue-500 rounded-md px-2 mt-1 w-full"
                onChange={handleRadioChange}
                defaultValue={1}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={<span className="text-sm">Bulk</span>}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={<span className="text-sm">NADS</span>}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        ) : (
          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <span className="text-md font-bold text-slate-900">
                  Demographic
                </span>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="demographic"
                className="border-2 border-blue-500 rounded-md px-2 mt-1"
                onChange={handleRadioChange}
                defaultValue={1}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={<span className="text-sm">Residential</span>}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={<span className="text-sm">Business</span>}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}

        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <span className="text-md font-bold text-slate-900">
                Order Type
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="order_type"
              className="border-2 border-blue-500 rounded-md px-2 mt-1"
              onChange={handleRadioChange}
              defaultValue={1}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={<span className="text-sm">Call Type</span>}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={<span className="text-sm">Complaint</span>}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={otypeCall}>
          <FormControl className="w-full">
            <FormLabel id="demo-row-radio-buttons-group-label">
              <span className="text-md font-bold text-slate-900">
                Call Type
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
            >
              <Select
                variant="standard"
                className="mt-0 w-full border-none"
                name="call_type"
                defaultValue={1}
                onChange={handleInput}
              >
                <MenuItem value="1">
                  <span className="text-sm">Call</span>
                </MenuItem>
                <MenuItem value="2">
                  <span className="text-sm">SMS</span>
                </MenuItem>
              </Select>
            </RadioGroup>
          </FormControl>
        </div>

        <div className={otypeComplaint}>
          <FormControl className="w-full">
            <FormLabel id="demo-row-radio-buttons-group-label">
              <span className="text-md font-bold text-slate-900">
                Type of Complaint
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
            >
              <Select
                variant="standard"
                className="mt-0 w-full"
                name="type_of_complaint"
                defaultValue={0}
                onChange={handleInput}
              >
                <MenuItem value="0">
                  <span className="text-sm">Choose One</span>
                </MenuItem>
                <MenuItem value="1">
                  <span className="text-sm">Cancelled Order</span>
                </MenuItem>
              </Select>
            </RadioGroup>
          </FormControl>
        </div>
        <div className={otypeComplaint}>
          <FormControl className="w-full">
            <FormLabel id="demo-row-radio-buttons-group-label">
              <span className="text-md font-bold text-slate-900">
                Reason of Cancel
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
            >
              <Select
                variant="standard"
                className="mt-0 w-full"
                name="reason_cancell"
                defaultValue={0}
                onChange={handleInput}
              >
                <MenuItem value="0">
                  <span className="text-sm">Choose One</span>
                </MenuItem>
                <MenuItem value="1">
                  <span className="text-sm">Late Delivery</span>
                </MenuItem>
              </Select>
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Modal_Order_Type;
