import InventoryDetails_L from "./InventoryDetails_L";
import InventoryDetails_R from "./InventoryDetails_R";
import InventorySearchInput from "./InventorySearchInput";

function InventoryReport() {
  return (
    <>
      <div className="px-10 pt-5 flex">
        <div className="w-1/4 h-64 pt-3">
          <InventoryDetails_L />
        </div>
        <div className="pt-3 w-3/4">
          <div className="flex justify-end pr-3 w-full">
            {/* <InventorySearchInput /> */}
            <input
              type="text"
              id="input-group-1"
              name="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
              placeholder="Search"
            />
          </div>
          <div className="w-full">
            <InventoryDetails_R />
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryReport;
