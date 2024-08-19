import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Modal_CustomerInformation from "./Modal_CustomerInformation";
import Modal_ProductOrder from "./Modal_ProductOrder";
import Modal_Others from "./Modal_Others";
import { useEffect, useState } from "react";
import { useCustomerInfoIDQuery } from "../../store";
import { Avatar } from "@mui/material";
import Modal_Show_CustomerInformation from "./Modal_Show_CustomerInformation";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface cust_idProps {
  cust_id: string;
  orderID: string;
}

interface customer {
  fname: string;
  lname: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 48,
      height: 48,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Modal_Show_All_Details({
  cust_id,
  orderID,
}: cust_idProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("callType");
  const [otypeCall, setotypeCall] = React.useState("");
  const [otypeComplaint, setotypeComplaint] = React.useState("hidden");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let otype = (event.target as HTMLInputElement).value;
    setValue(otype);
    if (otype === "callType") {
      setotypeCall("");
      setotypeComplaint("hidden");
    } else {
      setotypeComplaint("");
      setotypeCall("hidden");
    }
  };

  const [customerInfo, setCustomerInfo] = useState<customer>({
    fname: "",
    lname: "",
  });
  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useCustomerInfoIDQuery(cust_id || "");

  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      // setCustData(customer.data);
      // console.warn(custInfo.data);
      setCustomerInfo(custInfo.data);
      // console.warn(custInfo.data);
    }
  }, [isCustInfoSuccess, custInfo]);

  // console.warn("HAHAHAHHA", customerInfo);
  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={handleClickOpen}
        disabled={!orderID}
      >
        Show All Details
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-1/3">
              <div className="flex ">
                <div>
                  <Avatar
                    {...(customerInfo
                      ? stringAvatar(
                          `${customerInfo.fname} ${customerInfo.lname}`
                        )
                      : null)}
                  />
                </div>
                <div className="pl-3">
                  <span className="font-bold">
                    {customerInfo.fname} {customerInfo.lname}
                  </span>
                  <p>Order ID: {orderID}</p>
                </div>
              </div>
            </div>
            <div className="w-2/3 flex justify-end pr-10"></div>
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="grid grid-cols-5">
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
                  // onChange={handleRadioChange}
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
                  // onChange={handleRadioChange}
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
                    // onChange={handleInput}
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
                    defaultValue=""
                    // onChange={handleInput}
                  >
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
                    // onChange={handleInput}
                    defaultValue=""
                  >
                    <MenuItem value="1">
                      <span className="text-sm">Late Delivery</span>
                    </MenuItem>
                  </Select>
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <hr className="mt-3" />
          <Modal_Show_CustomerInformation cust_id={cust_id} orderID={orderID} />

          <hr className="mt-3" />
          <Modal_ProductOrder orderID={orderID} />

          <hr className="mt-5" />
          <Modal_Others orderID={orderID} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
