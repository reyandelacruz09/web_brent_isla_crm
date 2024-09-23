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

import Modal_CustomerInformation from "./Modal_CustomerInformation";
import Modal_ProductOrder from "./Modal_ProductOrder";
import Modal_Others from "./Modal_Others";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useCustomerInfoIDQuery,
  useCustomerOrderIDQuery,
  useGetRolesQuery,
  // usePassComplaintMutation,
  useUpdateOrderMutation,
  useSendComplaintMutation,
} from "../../store";
import { Avatar } from "@mui/material";
import Modal_Show_CustomerInformation from "./Modal_Show_CustomerInformation";
import { Slide, toast } from "react-toastify";
import Print_Preview from "./Print_Preview";
import axios from "axios";

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

interface ApiData {
  orderID: string;
  complaint_message: string;
  lname: string;
  fname: string;
  phone1: string;
  phone2: string;
  landline: string;
  email: string;
  block_unit: string;
  company: string;
  nearest_landmark: string;
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

  const [disabledButton, setDisabledButton] = React.useState(false);
  const { data: dbutton, isSuccess: isDButtonSuccess } =
    useCustomerOrderIDQuery(orderID || "");

  const [customerInfo, setCustomerInfo] = useState<customer>({
    fname: "",
    lname: "",
  });
  const [apiData, setApiData] = useState<ApiData>({
    orderID: "",
    complaint_message: "",
    lname: "",
    fname: "",
    phone1: "",
    phone2: "",
    landline: "",
    email: "",
    block_unit: "",
    company: "",
    nearest_landmark: "",
  });
  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useCustomerInfoIDQuery(cust_id || "");

  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      setCustomerInfo(custInfo.data);
      setApiData((previous) => ({
        ...previous,
        lname: custInfo.data.lname,
        fname: custInfo.data.fname,
        phone1: custInfo.data.phone1,
        phone2: custInfo.data.phone2,
        landline: custInfo.data.landline,
        email: custInfo.data.email,
        block_unit: custInfo.data.block_unit,
        company: custInfo.data.company,
        nearest_landmark: custInfo.data.nearest_landmark,
      }));
    }
  }, [isCustInfoSuccess, custInfo]);

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
      setApiData((previous) => ({
        ...previous,
        orderID: dbutton.data.id,
      }));

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
        setotypeComplaint1("hidden");
        setotypeComplaint2("hidden");
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

  const handleInput = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof OrderType;
    const value = event.target.value;

    if (name === "type_of_complaint") {
      if (value === "1") {
        setotypeComplaint1("");
        setotypeComplaint2("hidden");
      } else if (value === "2") {
        setotypeComplaint1("hidden");
        setotypeComplaint2("col-span-2");
        setOrderType({
          ...orderType,
          reason_cancell: "0",
        });
      } else {
        setotypeComplaint1("hidden");
        setotypeComplaint2("hidden");
      }
    }
    setOrderType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setOrderType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setApiData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log("API Data: ", apiData);
  const [updateOrder] = useUpdateOrderMutation();
  // const [upComplaint] = usePassComplaintMutation();
  const [senComplaint] = useSendComplaintMutation();

  const newapiData = {
    orderID: 14,
    complaint_message: "sample",
    lname: "Bausing",
    fname: "Jonas",
    phone1: "09455904251",
    phone2: "",
    landline: "",
    email: "jonasbausing@gmail.com",
    block_unit: "1167 Chino Roces Ave",
    company: "OODC",
    nearest_landmark: "near church",
  };

  const externalApi = async () => {
    try {
      const formData = new FormData();
      formData.append("newapiData", JSON.stringify(newapiData));

      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://flow.zoho.com/772396954/flow/webhook/incoming?zapikey=1001.2768223215be0fcafdcfbadcbadd93e5.35f2633c889af89b756ed315cf7b2d29&isdebug=false`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        console.log("Response Data:", response.data);
        console.log("FormData here:", formData);
        console.log("ApiData here:", newapiData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveOrder = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await updateOrder(orderType).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Updated!", {
          transition: Slide,
        });
        handleClose();
      } else {
        alert("something wrong");
      }

      if (orderType.type_of_complaint === "2") {
        externalApi();
        // const sendComplaint = await senComplaint(apiData).unwrap();
        // console.log("API Data: ", apiData);
      }

      // console.log("API Data: ", apiData);
      // console.log(orderType.type_of_complaint);
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  return (
    <React.Fragment>
      <div className="hide-on-print">
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
              <div className="w-2/3 flex justify-end pr-10">
                <div className="flex gap-3">
                  <Print_Preview cust_id={cust_id} orderID={orderID} />
                  <Button
                    component="label"
                    variant="contained"
                    className="w-32 pt-2 h-10"
                    tabIndex={-1}
                    size="small"
                    color="primary"
                    onClick={handleClose}
                    disabled={orderType.order_type === "2" ? false : true}
                  >
                    <span className="">Cancel</span>
                  </Button>
                  <Button
                    component="label"
                    variant="contained"
                    className="w-36 pt-2 h-10"
                    tabIndex={-1}
                    size="small"
                    color="primary"
                    disabled={orderType.order_type === "2" ? false : true}
                    onClick={saveOrder}
                  >
                    <span className="">Save and Close</span>
                  </Button>
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
                    onChange={handleRadioChange}
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
                    onChange={handleRadioChange}
                    defaultValue={orderType.order_type}
                  >
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio
                          disabled={
                            getRolesAPI.data?.data.order.edit === true
                              ? false
                              : true
                          }
                        />
                      }
                      label={<span className="text-sm">Call Type</span>}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                    <FormControlLabel
                      value="2"
                      control={
                        <Radio
                          disabled={
                            getRolesAPI.data?.data.order.edit === true
                              ? false
                              : true
                          }
                        />
                      }
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
                    onChange={handleRadioChange}
                  >
                    <Select
                      variant="standard"
                      className="mt-0 w-full border-none"
                      name="call_type"
                      disabled={
                        getRolesAPI.data?.data.order.edit === true
                          ? false
                          : true
                      }
                      value={orderType.call_type}
                      onChange={handleInput}
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
                    onChange={handleRadioChange}
                  >
                    <Select
                      variant="standard"
                      className="mt-0 w-full"
                      name="type_of_complaint"
                      value={orderType.type_of_complaint}
                      onChange={handleInput}
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
                      onChange={handleInput}
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
                    value={orderType.complaint_message || ""} // Ensure value is controlled
                    onChange={handleTextareaChange}
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
