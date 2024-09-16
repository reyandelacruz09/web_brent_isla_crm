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
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Modal_CustomerInformation from "../order/Modal_CustomerInformation";
import Modal_ProductOrder from "../order/Modal_ProductOrder";
import Modal_Others from "../order/Modal_Others";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useCustomerInfoIDQuery,
  useCustomerOrderIDQuery,
  useViewComplaintsIDQuery,
} from "../../store";
import { Avatar } from "@mui/material";
import Modal_Show_CustomerInformation from "../order/Modal_Show_CustomerInformation";
import { Slide, toast } from "react-toastify";
import Print_Preview from "../order/Print_Preview";
import Date_Format from "../order/Date_Format";

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
  name: string;
  type: string;
}

interface customer {
  fname: string;
  lname: string;
}

type OrderType = {
  orderID: number;
  demographic: string;
  order_type: string;
  call_type: string;
  type_of_complaint: string;
  reason_cancell: string;
  complaint_message: string;
  added_by: string;
};

interface complaints {
  id: number;
  date: string;
  complaint: string;
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

export default function Show_Order_Details({
  cust_id,
  orderID,
  name,
  type,
}: cust_idProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const [value, setValue] = React.useState("callType");
  const [otypeCall, setotypeCall] = React.useState("");
  const [otypeComplaint, setotypeComplaint] = React.useState("hidden");
  const [otypeComplaint1, setotypeComplaint1] = React.useState("hidden");
  const [otypeComplaint2, setotypeComplaint2] = React.useState("hidden");
  const [orderType, setOrderType] = useState<OrderType>({
    orderID: 0,
    demographic: "",
    order_type: "1",
    call_type: "",
    type_of_complaint: "",
    reason_cancell: "",
    complaint_message: "",
    added_by: "",
  });

  const [listcomp, setListComp] = useState<complaints[]>([]);

  const [disabledButton, setDisabledButton] = React.useState(false);
  const { data: dbutton, isSuccess: isDButtonSuccess } =
    useCustomerOrderIDQuery(orderID || "");

  useEffect(() => {
    if (isDButtonSuccess && dbutton) {
      // setCustomerInfo(dbutton.data);
      // console.warn("Order: ", dbutton.data.status);
      setOrderType({
        orderID: dbutton.data.id,
        demographic: dbutton.data.demographic,
        order_type: dbutton.data.order_type,
        call_type: dbutton.data.call_type,
        type_of_complaint: dbutton.data.type_of_complaint,
        reason_cancell: dbutton.data.reason_cancel,
        complaint_message: dbutton.data.complaint_message || "",
        added_by: account_detailed1.id,
      });
      if (dbutton.data.status < 3) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    }
    setotypeCall("");
    setotypeComplaint("hidden");
    setotypeComplaint1("hidden");
    setotypeComplaint2("hidden");
  }, [isDButtonSuccess, dbutton]);

  const [customerInfo, setCustomerInfo] = useState<customer>({
    fname: "",
    lname: "",
  });
  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useCustomerInfoIDQuery(cust_id || "");

  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      setCustomerInfo(custInfo.data);
    }
  }, [isCustInfoSuccess, custInfo]);

  const displayComplaint = useViewComplaintsIDQuery({
    cpid: orderID,
  });

  useEffect(() => {
    if (displayComplaint.isSuccess) {
      // console.log("Order ID", orderID);
      // console.log("Complaints here: ", displayComplaint.data);
      let result: any = [];
      result = displayComplaint.data;

      const size = Object.keys(result.data).length;
      const listComplaint: complaints[] = [];

      console.log("size: ", result);
      for (let i = 0; i < size; i++) {
        listComplaint.push({
          id: i,
          date: result.data[i].date_added,
          complaint: result.data[i].complaint,
        });
      }
      setListComp(listComplaint);
      // console.log("ListComplaint: ", listComplaint);
    }
  }, [displayComplaint.isSuccess, displayComplaint]);

  return (
    <React.Fragment>
      <div className="hide-on-print">
        <div onClick={handleClickOpen}>
          <span>{name}</span>
        </div>
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
              <div className="w-2/3 flex justify-end pr-10">
                <div className="flex gap-3">
                  <Print_Preview cust_id={cust_id} orderID={orderID} />
                </div>
              </div>
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
            {type === "complaint" ? (
              <>
                <div className="p-2 rounded-xl">
                  <div>
                    <b>Complaint</b>
                  </div>
                  <div className=" pl-10">
                    <ul>
                      {listcomp.map((comp: any, index: number) => (
                        <li key={index}>
                          <Date_Format date_formatted={comp.date} /> -{" "}
                          {comp.complaint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <hr className="my-3" />
                </div>
              </>
            ) : (
              ""
            )}

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
                    defaultValue={orderType.demographic}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio disabled />}
                      label={<span className="text-sm">Residential</span>}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio disabled />}
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
                    defaultValue={orderType.order_type}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio disabled />}
                      label={<span className="text-sm">Call Type</span>}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio disabled />}
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
                      disabled
                      value={orderType.call_type}
                    >
                      <MenuItem value="1">
                        <span className="text-sm">Call</span>
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
                      value={orderType.type_of_complaint}
                    >
                      <MenuItem value="0">
                        <span className="text-sm">------------</span>
                      </MenuItem>
                      <MenuItem value="1" disabled={disabledButton}>
                        <span className="text-sm">Cancelled Order</span>
                      </MenuItem>
                      <MenuItem value="2">
                        <span className="text-sm">Complaint</span>
                      </MenuItem>
                    </Select>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={otypeComplaint1}>
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
                      value={orderType.reason_cancell}
                    >
                      <MenuItem value="0">
                        <span className="text-sm">------------</span>
                      </MenuItem>
                      <MenuItem value="1" disabled={disabledButton}>
                        <span className="text-sm">Late Delivery</span>
                      </MenuItem>
                    </Select>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={otypeComplaint2}>
                <FormControl className="w-full">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    <span className="text-md font-bold text-slate-900">
                      Complaint
                    </span>
                  </FormLabel>
                  <textarea
                    name="complaint_message"
                    value={orderType.complaint_message || ""}
                    className="w-full mt-1 border-2 border-blue-500 rounded-md px-2"
                    rows={2}
                  />
                </FormControl>
              </div>
            </div>

            <hr className="mt-3" />
            <Modal_Show_CustomerInformation
              cust_id={cust_id}
              orderID={orderID}
            />

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
      </div>
    </React.Fragment>
  );
}
