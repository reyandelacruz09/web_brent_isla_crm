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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AddIcon from "@mui/icons-material/Add";
import CustomerInformation from "./CustomerInformation";
import ProductOrder from "./ProductOrder";
import Others from "./Others";

import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { adress } from "../branch/AddBranch";
import {
  useBarangayListQuery,
  useBranchListQuery,
  useCityListQuery,
  useProvinceListQuery,
  useRegionListQuery,
  useCreateOrderMutation,
} from "../../store";
import { Client } from "../product/AddProduct";
import toast from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("callType");
  const [otypeCall, setotypeCall] = React.useState("");
  const [otypeComplaint, setotypeComplaint] = React.useState("hidden");

  const [regionList, setRegionList] = useState<adress[]>([]);
  const [provinceList, setProvinceList] = useState<adress[]>([]);
  const [cityList, setCityList] = useState<adress[]>([]);
  const [barangayList, setBarangayList] = useState<adress[]>([]);

  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  const { data: regions, isSuccess: isRegionSuccess } = useRegionListQuery("");
  useEffect(() => {
    if (isRegionSuccess && regions) {
      setRegionList(regions.data);
    }
  }, [isRegionSuccess, regions]);

  const { data: province, isSuccess: isProvinceSuccess } = useProvinceListQuery(
    selectedRegionId || ""
  );

  useEffect(() => {
    if (isProvinceSuccess && province) {
      setProvinceList(province.data);
    }
  }, [isProvinceSuccess, province]);

  const { data: city, isSuccess: isCitySuccess } = useCityListQuery(
    selectedProvinceId || ""
  );

  useEffect(() => {
    if (isCitySuccess && city) {
      setCityList(city.data);
    }
  }, [isCitySuccess, city]);

  const { data: barangay, isSuccess: isBarangaySuccess } = useBarangayListQuery(
    selectedCityId || ""
  );

  useEffect(() => {
    if (isBarangaySuccess && barangay) {
      setBarangayList(barangay.data);
    }
  }, [isBarangaySuccess, barangay]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegionId(event.target.value);
    setSelectedProvinceId("0");
    setSelectedCityId("0");
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvinceId(event.target.value);
    setSelectedCityId("0");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(event.target.value);
  };

  const clients = useBranchListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const [formData, setFormData] = React.useState({
    demographic: 1,
    order_type: 1,
    call_type: 1,
    type_of_complaint: 0,
    reason_cancell: 0,
    customer: {
      fname: "",
      lname: "",
      phone1: "",
      phone2: "",
      landline: "",
      email: "",
      block_unit: "",
      barangay: "",
      company: "",
      nearest_landmark: "",
    },
    order: {
      branch: "",
      customerID: "",
      demographic: "",
      order_type: "",
      call_type: "",
      type_of_complaint: "",
      reason_cancell: "",
      sendsms: "",
      sendemail: "",
      special_instructions: "",
      expected_deldate: "",
      expected_deltime: "",
    },
    productOrder: {
      product: "",
      price: "",
      quantity: "",
      discount: "",
      total: "",
      subtotal: "",
      delcharge: "",
      total_discount: "",
      grandtotal: "",
      mopayment: "",
      changefor: "",
      changeamount: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "order_type") {
      setValue(value);
      if (value === "1") {
        setotypeCall("");
        setotypeComplaint("hidden");
      } else {
        setotypeComplaint("");
        setotypeCall("hidden");
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => {
      const customerFields = [
        "fname",
        "lname",
        "phone1",
        "phone2",
        "landline",
        "email",
        "block_unit",
        "barangay",
        "company",
        "nearest_landmark",
      ];

      const orderFields = [
        "branch",
        "customerID",
        "demographic",
        "order_type",
        "call_type",
        "type_of_complaint",
        "reason_cancell",
        "sendsms",
        "sendemail",
        "special_instructions",
        "expected_deldate",
        "expected_deltime",
      ];

      if (customerFields.includes(name)) {
        return {
          ...prevState,
          customer: {
            ...prevState.customer,
            [name]: finalValue,
          },
        };
      } else if (orderFields.includes(name)) {
        return {
          ...prevState,
          order: {
            ...prevState.order,
            [name]: finalValue,
          },
        };
      }

      return {
        ...prevState,
        [name]: finalValue,
      };
    });
  };

  // const checkdata = async (e: any) => {
  //   e.preventDefault();

  //   console.warn(formData);
  // };

  const [addOrder] = useCreateOrderMutation();
  const saveOrder = async (e: any) => {
    e.preventDefault();

    console.warn(formData);
    // const data1 = {
    //   code: branch.code,
    //   name: branch.name,
    //   active: branch.active,
    //   owner: branch.owner,
    //   block_street: branch.block_street,
    //   barangay: branch.barangay,
    //   email: branch.email,
    // };

    try {
      const checkstat = await addOrder(formData).unwrap();
      if (checkstat.success === true) {
        // alert("success");
        toast.success("Successfully Updated!");
        {
          // setBranch({
          //   code: "",
          //   name: "",
          //   active: true,
          //   owner: 0,
          //   block_street: "",
          //   barangay: "",
          //   email: "",
          // });
          // window.location.reload();
        }
      } else {
        alert("something wrong");
      }
    } catch (error) {
      alert("Hala");
    }
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create New Order
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
            <div className="w-1/3">Create Order</div>
            <div className="w-2/3 flex justify-end pr-10">
              <div className="flex gap-3">
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                  onClick={saveOrder}
                >
                  <span className="">Save & Close</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                  onClick={saveOrder}
                >
                  <span className="">Save & New</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-36 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Locate Address</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Print Preview</span>
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
                  value={formData.demographic}
                  onChange={handleRadioChange}
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
                  value={formData.order_type}
                  onChange={handleRadioChange}
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
                    value={formData.call_type}
                    onChange={handleInputChange}
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
                    value={formData.type_of_complaint}
                    onChange={handleInputChange}
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
                    value={formData.reason_cancell}
                    onChange={handleInputChange}
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
                  name="fname"
                  value={formData.customer.fname}
                  onChange={handleInputChange}
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={formData.customer.lname}
                  onChange={handleInputChange}
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
                  value={formData.customer.phone1}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  className="absolute top-0 right-0"
                  control={<Checkbox />}
                  label="Send SMS"
                  name="sendsms"
                  onChange={handleInputChange}
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
                  value={formData.customer.phone2}
                  onChange={handleInputChange}
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
                  value={formData.customer.landline}
                  onChange={handleInputChange}
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
                  value={formData.customer.email}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  className="absolute top-0 right-0"
                  control={<Checkbox />}
                  label="Send Email"
                  name="sendemail"
                  onChange={handleInputChange}
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
                  value={formData.customer.block_unit}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Region
              </label>
              <div className="relative mb-6">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleRegionChange}
                  name="region"
                >
                  <option>Select Region</option>
                  {regionList.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Province
              </label>
              <div className="relative mb-6">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleProvinceChange}
                  name="province"
                >
                  <option>Select Province</option>
                  {provinceList.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Municipality
              </label>
              <div className="relative mb-6">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleCityChange}
                  name="city"
                >
                  <option>Select Municipality</option>
                  {cityList.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Barangay
              </label>
              <div className="relative mb-6">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="barangay"
                  value={formData.customer.barangay}
                  onChange={handleInputChange}
                >
                  <option>Select Barangay</option>
                  {barangayList.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
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
                  value={formData.customer.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch Assignment
              </label>
              <div className="relative mb-6">
                <select
                  name="branch"
                  value={formData.order.branch}
                  onChange={handleInputChange}
                  id="rec_mode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                >
                  <option value="" disabled>
                    Choose One
                  </option>
                  {content.map((listOption: any) => (
                    <option key={listOption.id} value={listOption.id}>
                      {listOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Expected Delivery Time
              </label>
              <div className="relative mb-6 flex">
                {/* <input
                  type="time"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="expected_deltime"
                  value={formData.order.expected_deltime}
                  onChange={handleInputChange}
                /> */}
                {/* <DatePicker
                  selected={startDate}
                  //onChange={(date) => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                /> */}
                <input
                  type="date"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="expected_deldate"
                  value={formData.order.expected_deldate}
                  onChange={handleInputChange}
                />
                <input
                  type="time"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="expected_deltime"
                  value={formData.order.expected_deltime}
                  onChange={handleInputChange}
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
                  value={formData.customer.nearest_landmark}
                  onChange={handleInputChange}
                >
                  {" "}
                </textarea>
              </div>
            </div>
          </div>

          <hr className="mt-3" />
          <ProductOrder />

          <hr className="mt-5" />
          <Others />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
