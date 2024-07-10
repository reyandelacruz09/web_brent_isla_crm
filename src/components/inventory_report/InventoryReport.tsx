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
            <InventorySearchInput />
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
