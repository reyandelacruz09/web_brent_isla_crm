import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Input,
  InputAdornment,
  IconButton,
  DialogContent,
  FormControl,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { adress } from "../branch/AddBranch";
import {
  useBarangayListQuery,
  useBranchListQuery,
  useCityListQuery,
  useProvinceListQuery,
  useRegionListQuery,
  useCustomerInfoQuery,
  useListCustomerQuery,
} from "../../store";
import { Client } from "../product/AddProduct";
import React from "react";
import ContentPasteSearchOutlined from "@mui/icons-material/ContentPasteSearchOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";

type CustomerData = {
  customercode: string;
  customername: string;
  invoiceno: string;
  truck: string;
  tripno: string;
  fname: string;
  lname: string;
  phone1: string;
  phone2: string;
  landline: string;
  email: string;
  block_unit: string;
  barangay: string;
  company: string;
  nearest_landmark: string;
  expected_deldate: string;
  expected_deltime: string;
  sendsms: boolean;
  sendemail: boolean;
  branch: string;
};

interface Customer {
  id: string;
  fname: string;
  lname: string;
  phone1: string;
  phone2: string;
  landline: string;
  email: string;
  block_unit: string;
  address: string;
  company: string;
}

interface Branch {
  id: string;
  name: string;
}

type CustomerInformationProps = {
  customerData: CustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
};

function CustomerInformation({
  customerData,
  setCustomerData,
}: CustomerInformationProps) {
  const [openModal, setOpenModal] = useState(false);
  const [regionList, setRegionList] = useState<adress[]>([]);
  const [provinceList, setProvinceList] = useState<adress[]>([]);
  const [cityList, setCityList] = useState<adress[]>([]);
  const [barangayList, setBarangayList] = useState<adress[]>([]);

  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [apiPhone, setApiPhone] = useState<string>("");
  const [apiPhoneCustomer, setApiPhoneCustomer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

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

  const clients = useListCustomerQuery({
    department_id: account_detailed1.department.id,
  });
  const [content, setContent] = useState<Customer[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      console.log("Result: ", result);
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const branches = useBranchListQuery({
    owner: account_detailed1.department.id,
  });
  const [branchList, setBranchList] = useState<Branch[]>([]);
  useEffect(() => {
    if (branches.isSuccess) {
      const result = branches.data?.data || [];
      console.log("Result: ", result);
      setBranchList(result);
    }
  }, [branches.isSuccess, branches.data]);

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "phone1") {
      setApiPhone(value);
    }
  };

  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useCustomerInfoQuery(apiPhone);
  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      if (custInfo.data.phone1 != "") {
        // console.warn(custInfo.data);
        setCustomerData({
          ...customerData,
          fname: custInfo.data?.fname,
          lname: custInfo.data?.lname,
          phone2: custInfo.data?.phone2,
          landline: custInfo.data?.landline,
          email: custInfo.data?.email,
          block_unit: custInfo.data?.block_unit,
          barangay: custInfo.data?.barangay.id,
          company: custInfo.data?.company,
          nearest_landmark: custInfo.data?.nearest_landmark,
        });
        setSelectedRegionId(custInfo.data?.barangay.city.province.region.id);
        setSelectedProvinceId(custInfo.data?.barangay.city.province.id);
        setSelectedCityId(custInfo.data?.barangay.city.id);
      } else {
        setCustomerData({
          ...customerData,
          fname: "",
          lname: "",
          phone2: "",
          landline: "",
          email: "",
          block_unit: "",
          barangay: "",
          company: "",
          nearest_landmark: "",
        });
        setSelectedRegionId("0");
        setSelectedProvinceId("0");
        setSelectedCityId("0");
      }
    }
  }, [isCustInfoSuccess, custInfo]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const updateApiPhone = () => {
    setOpenModal(false);
    setApiPhone(apiPhoneCustomer);
  };

  const columns: GridColDef[] = [
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "lname", headerName: "Last Name", width: 150 },
    { field: "phone1", headerName: "Phone 1", width: 130 },
    { field: "phone2", headerName: "Phone 2", width: 130 },
    { field: "landline", headerName: "Landline", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "address", headerName: "Address", width: 600 },
  ];

  const renderCell = (params: any) => {
    // if (params.colDef.field === "price") {
    //   return (
    //     <div className="text-right pr-5">
    //       <span>
    //         {new Intl.NumberFormat("en-US", {
    //           minimumFractionDigits: 2,
    //           maximumFractionDigits: 2,
    //         }).format(parseFloat(params.value ? params.value : "0"))}
    //       </span>
    //     </div>
    //   );
    // } else if (params.colDef.field === "stock") {
    //   return (
    //     <div className="text-right pr-5">
    //       <span>{params.value}</span>
    //     </div>
    //   );
    // }

    return params.value;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = content.filter(
    (customer) =>
      customer.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.phone2
        ? customer.phone2.toLowerCase().includes(searchQuery.toLowerCase())
        : false) ||
      (customer.landline
        ? customer.landline.toLowerCase().includes(searchQuery.toLowerCase())
        : false) ||
      (customer.email
        ? customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        : false)
  );

  return (
    <>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-3 mt-3 flex">
          <div className="w-1/2">
            <span className="text-lg font-bold flex items-center">
              <KeyboardAltOutlinedIcon className="align-center mr-2" />
              Customer Information
            </span>
          </div>
          <div className="flex justify-end w-1/2">
            <Button
              size="small"
              variant="contained"
              startIcon={<ContentPasteSearchOutlined />}
              onClick={handleOpenModal}
            >
              Find Customer
            </Button>
          </div>
        </div>

        {account_detailed1.department.id === 4 ? (
          <>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Customer Code
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="fname"
                  value={customerData.customercode}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Customer Name
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="lname"
                  value={customerData.customername}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Invoice No
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="lname"
                  value={customerData.invoiceno}
                  onChange={handleInput}
                />
              </div>
            </div>
          </>
        ) : (
          <>
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
                  value={customerData.fname}
                  onChange={handleInput}
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
                  value={customerData.lname}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Cell Phone 1
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="phone1"
                  onChange={handleInput}
                  value={apiPhone}
                />
                <FormControlLabel
                  className="absolute top-0 right-0 h-full"
                  control={<Checkbox />}
                  label="Send SMS"
                  name="sendsms"
                  onChange={handleInput}
                />
              </div>
            </div>
          </>
        )}

        {account_detailed1.department.id === 4 ? (
          <>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Truck
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="phone2"
                  value={customerData.truck}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Trip No
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="landline"
                  value={customerData.tripno}
                  onChange={handleInput}
                />
              </div>
            </div>
          </>
        ) : (
          <>
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
                  value={customerData.phone2}
                  onChange={handleInput}
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
                  value={customerData.landline}
                  onChange={handleInput}
                />
              </div>
            </div>
          </>
        )}

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
              value={customerData.email}
              onChange={handleInput}
            />
            <FormControlLabel
              className="absolute top-0 right-0 h-full"
              control={<Checkbox />}
              label="Send Email"
              name="sendemail"
              onChange={handleInput}
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
              value={customerData.block_unit}
              onChange={handleInput}
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
              value={selectedRegionId ?? ""}
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
              value={selectedProvinceId ?? ""}
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
              value={selectedCityId ?? ""}
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
              onChange={handleInput}
              name="barangay"
              value={customerData.barangay}
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

        {account_detailed1.department.id === 4 ? (
          <></>
        ) : (
          <>
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
                  value={customerData.company}
                  onChange={handleInput}
                />
              </div>
            </div>
          </>
        )}

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Branch Assignment
          </label>
          <div className="relative mb-6">
            <select
              name="branch"
              onChange={handleInput}
              id="rec_mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            >
              <option value="" disabled selected>
                Choose One
              </option>
              {branchList.map((listOption: any) => (
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
            <input
              type="date"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="expected_deldate"
              onChange={handleInput}
            />
            <input
              type="time"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="expected_deltime"
              onChange={handleInput}
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
              onChange={handleInput}
              value={customerData.nearest_landmark}
            ></textarea>
          </div>
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "70vw",
            height: "85vh",
            maxWidth: "none",
            maxHeight: "none",
          },
        }}
      >
        <DialogTitle>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search Customer"
            value={searchQuery}
            onChange={handleSearch}
          />
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <FormControl fullWidth>
            <div className="flex justify-center">
              <DataGrid
                sx={{
                  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                    {
                      outline: "none",
                    },
                  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                      outline: "none",
                    },
                  width: "55vw",
                  maxWidth: "none",
                  height: "65vh",
                }}
                rowHeight={35}
                rows={filteredContent}
                columns={columns.map((col) => ({
                  ...col,
                  renderCell: renderCell,
                }))}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                hideFooterSelectedRowCount
                onRowClick={(params: GridRowParams) =>
                  setApiPhoneCustomer(params.row.phone1)
                }
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full pb-3">
            <div className="w-1/2">
              <Button
                variant="contained"
                color="success"
                onClick={updateApiPhone}
              >
                Choose
              </Button>
            </div>
            <div className="w-1/2 flex justify-end">
              <Button
                variant="contained"
                color="info"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerInformation;
