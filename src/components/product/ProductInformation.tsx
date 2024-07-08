import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";

function ProductInformation() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-3">
          <span className="text-lg font-bold">
            <KeyboardAltOutlinedIcon className="align-top" /> Product
            Information
          </span>
        </div>

        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Product Code
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
        </div>
        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-24"
              placeholder=""
            />
            <FormControlLabel
              className="absolute top-0 right-0"
              control={<Checkbox defaultChecked />}
              label="Active"
            />
          </div>
        </div>
        <div className="pt-5 mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Product Owner
          </label>
          <div className="relative mb-6 ">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
        </div>

        <div className="mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Unit Price
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Product Description
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
        </div>

        <div className=" mr-5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Bar Code
          </label>
          <div className="relative mb-6"></div>
        </div>
      </div>
    </>
  );
}

export default ProductInformation;
