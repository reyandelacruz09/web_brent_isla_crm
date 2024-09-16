import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useCustomerInfoIDQuery, useCustomerOrderIDQuery } from "../../store";

interface cust_idProps {
  cust_id: string;
  orderID: string;
}
interface barangay {
  id: string;
  name: string;
  city: city;
}
interface city {
  id: string;
  name: string;
  province: province;
}
interface province {
  id: string;
  name: string;
  region: region;
}
interface region {
  id: string;
  name: string;
}
interface customer {
  fname: string;
  lname: string;
  email: string;
  phone1: string;
  phone2: string;
  landline: string;
  block_unit: string;
  barangay: barangay;
  company: string;
  nearest_landmark: string;
}
interface branch {
  name: string;
}
interface Order {
  branch: branch;
  expected_deltime: string;
  time_deliver: string;
  sendsms: string;
  sendemail: string;
}

function formatDate(isoDateTime: string | number | Date) {
  const date = new Date(isoDateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
function formatTime(isoDateTime: string | number | Date) {
  const date = new Date(isoDateTime);
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  // const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");
  //   return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}`;
}

function Modal_Show_CustomerInformation({ cust_id, orderID }: cust_idProps) {
  const [customerInfo, setCustomerInfo] = useState<customer>({
    fname: "",
    lname: "",
    email: "",
    phone1: "",
    phone2: "",
    landline: "",
    block_unit: "",
    barangay: {
      id: "",
      name: "",
      city: {
        id: "",
        name: "",
        province: {
          id: "",
          name: "",
          region: {
            id: "",
            name: "",
          },
        },
      },
    },
    company: "",
    nearest_landmark: "",
  });
  const [customerOrder, setCustomerOrder] = useState<Order>({
    branch: {
      name: "",
    },
    expected_deltime: "",
    time_deliver: "",
    sendsms: "",
    sendemail: "",
  });

  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useCustomerInfoIDQuery(cust_id || "");

  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      setCustomerInfo(custInfo.data);
    }
  }, [isCustInfoSuccess, custInfo]);

  const { data: custOrder, isSuccess: isCustOrderSuccess } =
    useCustomerOrderIDQuery(orderID || "");

  useEffect(() => {
    if (isCustOrderSuccess && custOrder) {
      setCustomerOrder(custOrder.data);
    }
  }, [isCustOrderSuccess, custOrder]);

  const newDate = formatDate(customerOrder.expected_deltime);
  const newTime = formatTime(customerOrder.expected_deltime);

  return (
    <>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-3 mt-3">
          <span className="text-lg font-bold">
            <KeyboardAltOutlinedIcon className="align-top" /> Customer
            Information
          </span>
        </div>

        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="fname"
              value={customerInfo.fname}
              disabled
            />
          </div>
        </div>
        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="lname"
              value={customerInfo.lname}
              disabled
            />
          </div>
        </div>
        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Cell Phone 1
          </label>
          <div className="relative mb-6 ">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phone1"
              value={customerInfo.phone1}
              disabled
            />
            <FormControlLabel
              className="absolute top-0 right-0 h-full"
              control={
                <Checkbox
                  disabled
                  checked={customerOrder.sendsms === "Y" ? true : false}
                />
              }
              label="Send SMS"
              name="sendsms"
            />
          </div>
        </div>

        <div className="mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Cell Phone 2
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phone2"
              value={customerInfo.phone2}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Landline
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="landline"
              value={customerInfo.landline}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              value={customerInfo.email}
              disabled
            />
            <FormControlLabel
              className="absolute top-0 right-0 h-full"
              control={
                <Checkbox
                  disabled
                  checked={customerOrder.sendemail === "Y" ? true : false}
                />
              }
              label="Send Email"
              name="sendemail"
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Block No / Unit No / Street
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="block_unit"
              value={customerInfo.block_unit}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Region
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="region"
              value={customerInfo.barangay?.city?.province?.region?.name}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Province
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="province"
              value={customerInfo.barangay?.city?.province?.name}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Municipality
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="city"
              value={customerInfo.barangay?.city?.name}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Barangay
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="barangay"
              value={customerInfo.barangay?.name}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Company
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="company"
              value={customerInfo.company}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Branch Assignment
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="block_unit"
              value={customerOrder?.branch?.name}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Expected Delivery Time
          </label>
          <div className="relative mb-6 flex">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-2"
              name="expected_deldate"
              value={newDate}
              disabled
            />
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-2"
              name="expected_deltime"
              value={newTime}
              disabled
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Nearest Landmark / Remarks
          </label>
          <div className="relative mb-6">
            <textarea
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="nearest_landmark"
              value={customerInfo.nearest_landmark}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal_Show_CustomerInformation;
