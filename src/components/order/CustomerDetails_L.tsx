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

function CustomerDetails_L() {
  const [complaint, setcomplaint] = React.useState("hidden");

  const handleComplaint = (event: React.ChangeEvent<HTMLInputElement>) => {
    let otype = (event.target as HTMLInputElement).value;
    //setValue(otype);
    if (otype === "call") {
      setcomplaint("hidden");
    } else {
      setcomplaint("pt-3");
    }
  };

  return (
    <>
      <div>
        <Link to="/order">
          <span className="bg-gray-300 p-2 rounded-lg">
            <ArrowBackOutlinedIcon className="cursor-pointer" />
          </span>
        </Link>
        <span className="font-bold text-2xl pl-5">Customer Details</span>
      </div>

      <div className="py-5 flex justify-center">
        <div>
          <img
            className="inline-block w-14 object-cover rounded-full"
            src="../../images/avatar.jpg"
            alt=""
          />
        </div>
        <div className="pl-3">
          <span className="font-bold">Orlhie S. Almendares</span>
          <p>orlhie.almendares@gmail.com</p>
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
                placeholder=""
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
                placeholder=""
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
                placeholder=""
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
                placeholder=""
              />
            </div>
          </div>

          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <div className="relative mb-2">
              <textarea
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {" "}
              </textarea>
            </div>
          </div>
          <div className="py-2">
            <Modal_Show_All_Details />
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
    </>
  );
}

export default CustomerDetails_L;
