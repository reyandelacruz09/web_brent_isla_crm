import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import UpdateRoute from "./UpdateRoute";

function AddRoutes() {
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
  return (
    <>
      <div className="w-full pt-5">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex ">
            <div className="w-1/2 flex">
              <div className="flex justify-center">
                <span className="text-2xl font-bold">Add Route</span>
              </div>
              <div className="flex justify-center pl-5">
                <Button
                  component="label"
                  variant="contained"
                  className="w-40 pt-1"
                  tabIndex={-1}
                  size="small"
                  color="success"
                >
                  <span className="">Import CSV file</span>
                </Button>
              </div>
              <div className="flex justify-center pl-5">
                <UpdateRoute />
              </div>
            </div>
            <div className="w-1/2 flex gap-4 justify-end">
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="inherit"
                // onClick={clearBranch}
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
                // onClick={saveBranch}
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
                <KeyboardAltOutlinedIcon className="align-top" /> Route
                Information
              </span>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Department
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
                  name="department"
                  //   value={department.code}
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Block No / Unit
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
                  name="block_unit"
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Building / Subdivision
              </label>
              <input
                className={`bg-gray-50 border ${
                  validationErrors.owner ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                onChange={handleInput}
                name="building"
              />
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Street
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
                  name="street"
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Barangay
              </label>
              <div className="relative mb-6 max-h-60">
                <input
                  className={`bg-gray-50 border ${
                    validationErrors.region
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="barangay"
                  //   value={branch.region || ""}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <div className="relative mb-6 ">
                <input
                  className={`bg-gray-50 border ${
                    validationErrors.city ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="city"
                  //   value={branch.province || ""}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch Assignment
              </label>
              <div className="relative mb-6">
                <input
                  className={`bg-gray-50 border ${
                    validationErrors.city ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="branch_assignment"
                  //   value={branch.city || ""}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Routing
              </label>
              <div className="relative mb-6">
                <input
                  className={`bg-gray-50 border ${
                    validationErrors.barangay
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  onChange={handleInput}
                  name="routing"
                  //   value={branch.barangay || ""}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Complete Address
              </label>
              <div className="relative mb-6 ">
                <textarea
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  placeholder=""
                  onChange={handleInput}
                  name="completeAddress"
                  //   value={branch.email}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoutes;
