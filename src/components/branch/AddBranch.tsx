import { Button, Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import {
  useRegionListQuery,
  useProvinceListQuery,
  useCityListQuery,
  useBarangayListQuery,
  useClientListQuery,
  useCreateBranchMutation,
  useGetRolesQuery,
} from "../../store";
import { useEffect, useState } from "react";
import Branch from "../../pages/Branch";
import { Slide, toast } from "react-toastify";

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

  const clients = useClientListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess && clients) {
      let result: any = [];
      let content: any = [];
      result = clients.data;

      const size = Object.keys(result.data).length;
      const client: Client[] = [];

      for (let i = 0; i < size; i++) {
        client.push({
          id: result.data[i].id,
          name: result.data[i].name,
        });
      }

      setContent(client);
    }
  }, [clients, clients.isSuccess]);
  const listOptions = content;

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegionId(event.target.value);
    setSelectedProvinceId("0");
    setSelectedCityId("0");
    const { name, value } = event.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvinceId(event.target.value);
    setSelectedCityId("0");
    const { name, value } = event.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(event.target.value);
    const { name, value } = event.target;
    setBranch({ ...branch, [name]: value });
  };

  const [branch, setBranch] = useState({
    code: "",
    name: "",
    active: true,
    owner: "",
    block_street: "",
    barangay: "",
    email: "",
    region: "",
    province: "",
    city: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setBranch({ ...branch, [name]: type === "checkbox" ? checked : value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const [validationErrors, setValidationErrors] = useState({
    code: false,
    name: false,
    owner: false,
    block_street: false,
    barangay: false,
    email: false,
    region: false,
    province: false,
    city: false,
  });

  const validateFields = () => {
    const errors = {
      code: !branch.code,
      name: !branch.name,
      owner: !branch.owner,
      block_street: !branch.block_street,
      barangay: !branch.barangay,
      email: !branch.email,
      region: !branch.region,
      province: !branch.province,
      city: !branch.city,
    };
    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error === true);
  };

  const [addBranch] = useCreateBranchMutation();
  const saveBranch = async (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all required fields.", {
        transition: Slide,
      });
      return;
    }

    const data1 = {
      code: branch.code,
      name: branch.name,
      active: branch.active,
      owner: branch.owner,
      block_street: branch.block_street,
      barangay: branch.barangay,
      email: branch.email,
    };

    try {
      const checkstat = await addBranch(data1).unwrap();
      if (checkstat.success === true) {
        setBranch({
          code: "",
          name: "",
          active: true,
          owner: "",
          block_street: "",
          barangay: "",
          email: "",
          region: "",
          province: "",
          city: "",
        });
        toast.success("Successfully Added!", {
          transition: Slide,
        });
      } else {
        alert("something wrong");
      }
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const clearBranch = async (e: any) => {
    e.preventDefault();
    setBranch({
      code: "",
      name: "",
      active: true,
      owner: "",
      block_street: "",
      barangay: "",
      email: "",
      region: "",
      province: "",
      city: "",
    });
    setSelectedRegionId("0");
    setSelectedProvinceId("0");
    setSelectedCityId("0");
  };

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

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
                onClick={clearBranch}
              >
                <span className="">Clear</span>
              </Button>
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="primary"
                onClick={saveBranch}
                disabled={
                  getRolesAPI.data?.data.branch.create === true ? false : true
                }
              >
                <span className="">Save</span>
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
                  className={`bg-gray-50 border ${
                    validationErrors.code ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  placeholder=""
                  onChange={handleInput}
                  name="code"
                  value={branch.code}
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
                  className={`bg-gray-50 border ${
                    validationErrors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  placeholder=""
                  onChange={handleInput}
                  name="name"
                  value={branch.name}
                />
                <FormControlLabel
                  className="absolute top-0 right-0 h-full"
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
              <select
                className={`bg-gray-50 border ${
                  validationErrors.owner ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                onChange={handleInput}
                name="owner"
                value={branch.owner || ""}
              >
                <option value="" disabled selected>
                  Choose One
                </option>
                {listOptions.map((listOption) => (
                  <option key={listOption.id} value={listOption.id}>
                    {listOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Block No / Unit No
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.block_street
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  placeholder=""
                  onChange={handleInput}
                  name="block_street"
                  value={branch.block_street}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Region
              </label>
              <div className="relative mb-6 max-h-60">
                <select
                  className={`bg-gray-50 border ${
                    validationErrors.region
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  onChange={handleRegionChange}
                  name="region"
                  value={branch.region || ""}
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
                  className={`bg-gray-50 border ${
                    validationErrors.province
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  onChange={handleProvinceChange}
                  name="province"
                  value={branch.province || ""}
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
                  className={`bg-gray-50 border ${
                    validationErrors.city ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  onChange={handleCityChange}
                  name="city"
                  value={branch.city || ""}
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
                  className={`bg-gray-50 border ${
                    validationErrors.barangay
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  onChange={handleInput}
                  name="barangay"
                  value={branch.barangay || ""}
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
                  className={`bg-gray-50 border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  placeholder=""
                  onChange={handleInput}
                  name="email"
                  value={branch.email}
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
