import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";

function DepartmentInformation() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-3">
          <span className="text-lg font-bold">
            <KeyboardAltOutlinedIcon className="align-top" /> Department
            Information
          </span>
        </div>

        <div className="pt-3 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Department Code
          </label>
          <div className="relative mb-6">
            <input
              name="owner"
              id="rec_mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            />
          </div>
        </div>
        <div className="pt-3 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Department Name
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
            <FormControlLabel
              className="absolute top-0 right-0 h-full"
              control={<Checkbox name="active" />}
              label="Active"
            />
          </div>
        </div>

        <div className="pt-3 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <div className="relative mb-6">
            <input
              name="category"
              id="rec_mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            />
          </div>
        </div>

        <div className="mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Start Date
          </label>
          <div className="relative mb-6 ">
            <input
              type="date"
              id="input-group-1"
              name="code"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>

        <div className="mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            End Date
          </label>
          <div className="relative mb-6">
            <input
              type="date"
              id="input-group-1"
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>

        <div className="mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Department Head
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              name="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentInformation;
