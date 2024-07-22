import { Button, Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useRegionListQuery,
  useProvinceListQuery,
  useCityListQuery,
  useBarangayListQuery,
  useClientListQuery,
  useCreateBranchMutation,
} from "../../store";
import { useEffect, useState } from "react";
import Branch from "../../pages/Branch";

export interface Branch {
  data: any;
  id: string;
  client: string;
  code: string;
  name: string;
  active: string;
  owner: string;
  block_street: string;
  barangay: string;
  email: string;
}

export interface adress {
  id: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface ListClient {
  id: string;
  code: string;
  name: string;
  description: string;
  contact_name: string;
  contact_number: string;
}

function AddBranch() {
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

  const [branch, setBranch] = useState({
    code: "",
    name: "",
    active: true,
    owner: 2,
    block_street: "",
    barangay: "",
    email: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setBranch({ ...branch, [name]: type === "checkbox" ? checked : value });
  };

  const [addBranch] = useCreateBranchMutation();
  const saveBranch = async (e: any) => {
    e.preventDefault();

    const data1 = {
      code: branch.code,
      name: branch.name,
      active: branch.active,
      owner: 2,
      block_street: branch.block_street,
      barangay: branch.barangay,
      email: branch.email,
    };

    try {
      const checkstat = await addBranch(data1).unwrap();
      if (checkstat.success === true) {
        alert("success");
        {
          setBranch({
            code: "",
            name: "",
            active: true,
            owner: 2,
            block_street: "",
            barangay: "",
            email: "",
          });
          window.location.reload();
        }
      } else {
        alert("something wrong");
      }
    } catch (error) {
      alert("Hala");
    }
  };

  return (
    <>
      <div className="w-full pt-5">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex ">
            <div className="w-1/3">
              <span className="text-2xl font-bold">Add Branch</span>
            </div>
            <div className="w-2/3 flex gap-4 justify-end">
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="inherit"
              >
                <span className="">Cancel</span>
              </Button>
              <Button
                component="label"
                variant="contained"
                className="w-40 pt-2"
                tabIndex={-1}
                size="small"
                color="primary"
                onClick={saveBranch}
              >
                <span className="">Save and Close</span>
              </Button>
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="primary"
                onClick={saveBranch}
              >
                <span className="">Save and New</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <div className="w-5/6 p-5 border">
          <div className="grid grid-cols-3 mt-4">
            <div className="col-span-3 mt-3">
              <span className="text-lg font-bold">
                <KeyboardAltOutlinedIcon className="align-top" /> Branch
                Information
              </span>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch Code
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleInput}
                  name="code"
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch Name
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleInput}
                  name="name"
                />
                <FormControlLabel
                  className="absolute top-0 right-0"
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={handleInput}
                      name="active"
                    />
                  }
                  label="Active"
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch Owner
              </label>
              {/* <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleInput}
                  name="owner"
                />
              </div> */}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInput}
                name="owner"
              ></select>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Block No / Unit No
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleInput}
                  name="block_street"
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Region
              </label>
              <div className="relative mb-6 max-h-60">
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
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Province
              </label>
              <div className="relative mb-6 ">
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

            <div className="mr-5">
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
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Barangay
              </label>
              <div className="relative mb-6">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleInput}
                  name="barangay"
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
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleInput}
                  name="email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBranch;
