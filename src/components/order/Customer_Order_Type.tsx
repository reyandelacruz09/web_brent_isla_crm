import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

function Customer_Order_Type(createOrder1: any, setCreateOrder1: any) {
  const [value, setValue] = React.useState("callType");
  const [otypeCall, setotypeCall] = React.useState("");
  const [otypeComplaint, setotypeComplaint] = React.useState("hidden");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const otype = event.target.value;
    setValue(otype);
    if (otype === "callType") {
      setotypeCall("");
      setotypeComplaint("hidden");
    } else {
      setotypeComplaint("");
      setotypeCall("hidden");
    }
  };

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setCreateOrder1({
      ...createOrder1,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="grid grid-cols-5">
        <div>
          <FormControl>
            <FormLabel id="demographic-label">
              <span className="text-md font-bold text-slate-900">
                Demographic
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demographic-label"
              name="demographic"
              className="border-2 border-blue-500 rounded-md px-2 mt-1"
              defaultValue="residential"
              onChange={handleInput}
            >
              <FormControlLabel
                value="residential"
                control={<Radio />}
                label={<span className="text-sm">Residential</span>}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
              <FormControlLabel
                value="business"
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
        <div>
          <FormControl>
            <FormLabel id="order-type-label">
              <span className="text-md font-bold text-slate-900">
                Order Type
              </span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="order-type-label"
              name="order-type"
              className="border-2 border-blue-500 rounded-md px-2 mt-1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="callType"
                control={<Radio />}
                label={<span className="text-sm">Call Type</span>}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 15,
                  },
                }}
              />
              <FormControlLabel
                value="complaint"
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
            <FormLabel id="call-type-label">
              <span className="text-md font-bold text-slate-900">
                Call Type
              </span>
            </FormLabel>
            <Select
              variant="standard"
              className="mt-0 w-full border-none"
              defaultValue=""
            >
              <MenuItem value="Order">
                <span className="text-sm">Call</span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={otypeComplaint}>
          <FormControl className="w-full">
            <FormLabel id="complaint-type-label">
              <span className="text-md font-bold text-slate-900">
                Type of Complaint
              </span>
            </FormLabel>
            <Select variant="standard" className="mt-0 w-full" defaultValue="">
              <MenuItem value="Order">
                <span className="text-sm">Cancelled Order</span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={otypeComplaint}>
          <FormControl className="w-full">
            <FormLabel id="cancel-reason-label">
              <span className="text-md font-bold text-slate-900">
                Reason of Cancel
              </span>
            </FormLabel>
            <Select variant="standard" className="mt-0 w-full" defaultValue="">
              <MenuItem value="Late Delivery">
                <span className="text-sm">Late Delivery</span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Customer_Order_Type;
