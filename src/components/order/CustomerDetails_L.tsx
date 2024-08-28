import * as React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Modal_Show_All_Details from "./Modal_Show_All_Details";
import { useOrderCustomerDetailsQuery } from "../../store";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "../../App.css";

interface cust_idProps {
  cust_id: string;
  orderID: string;
}

interface customer {
  fname: string;
  lname: string;
  email: string;
  phone1: string;
  phone2: string;
  landline: string;
  block_unit: string;
  newAddress: string;
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
  /* eslint-enable no-bitwise */

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

function CustomerDetails_L({ cust_id, orderID }: cust_idProps) {
  const [custData, setCustData] = useState<customer[]>([]);
  const { data: customer, isSuccess: isCustomerSuccess } =
    useOrderCustomerDetailsQuery(cust_id || "");

  useEffect(() => {
    if (isCustomerSuccess && customer) {
      setCustData(customer.data);
    }
  }, [isCustomerSuccess, customer]);

  const address = custData[0]?.newAddress;

  const [complaint, setcomplaint] = React.useState("hidden");

  const handleComplaint = (event: React.ChangeEvent<HTMLInputElement>) => {
    let otype = (event.target as HTMLInputElement).value;
    if (otype === "call") {
      setcomplaint("hidden");
    } else {
      setcomplaint("pt-3");
    }
  };

  return (
    <>
      <div className="hide-on-print">
        <div>
          <Link to="/order">
            <span className="bg-gray-300 p-2 rounded-lg">
              <ArrowBackOutlinedIcon className="cursor-pointer" />
            </span>
          </Link>
          <span className="font-bold text-2xl pl-5">Customer Details</span>
        </div>

        <div className="py-5 flex justify-left">
          <div>
            <Avatar
              {...(custData[0]
                ? stringAvatar(`${custData[0].fname} ${custData[0].lname}`)
                : null)}
            />
          </div>
          <div className="pl-3">
            <span className="font-bold">
              {custData[0] ? `${custData[0].fname} ${custData[0].lname}` : ""}
            </span>
            <p>{custData[0]?.email || ""}</p>
          </div>
        </div>

        <div className="px-3 py-2">
          <div className=" border-gray-200 border-2 p-3 rounded-lg">
            <div className="">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Order ID
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={orderID}
                  disabled
                />
              </div>
            </div>

            <div className="">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Cell Phone 1
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  value={orderID ? custData[0]?.phone1 : ""}
                />
              </div>
            </div>

            <div className="">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Cell Phone 2
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  value={orderID ? custData[0]?.phone2 : ""}
                />
              </div>
            </div>

            <div className="">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Landline
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  value={orderID ? custData[0]?.landline : ""}
                />
              </div>
            </div>

            <div className="">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <div className="relative mb-2">
                <p className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-20 text-wrap">
                  {orderID ? address : ""}
                </p>
              </div>
            </div>
            <div className="py-2">
              <Modal_Show_All_Details cust_id={cust_id} orderID={orderID} />
            </div>

            <div className="border-2 bg-white rounded-md px-2 mt-1">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleComplaint}
              >
                <div className="w-1/2">
                  <FormControlLabel
                    value="call"
                    control={<Radio />}
                    label={<span className="text-sm">Call Type</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>

                <div className="w-1/2">
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
                </div>
              </RadioGroup>
            </div>

            <div className={complaint}>
              <FormControl className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Type of Complaint
                </label>

                <Select variant="standard" className="mt-0 w-full bg-gray-100 ">
                  <MenuItem value="Order">
                    <span className="text-sm">Late Delivery</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails_L;
