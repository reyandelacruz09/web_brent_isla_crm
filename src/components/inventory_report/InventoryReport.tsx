import { useState } from "react";
import InventoryDetails_L from "./InventoryDetails_L";
import InventoryDetails_R from "./InventoryDetails_R";
import InventorySearchInput from "./InventorySearchInput";

function InventoryReport() {
  const [products, setProducts] = useState({
    id: "",
    code: "",
    name: "",
    owner: "",
    receipt: "",
    released: "",
    stock: "",
  });

  return (
    <>
      <div className="px-10 pt-5 flex">
        <div className="w-1/4 h-64 pt-3">
          <InventoryDetails_L products={products} />
        </div>
        <div className="pt-3 w-3/4">
          <div className="w-full">
            <InventoryDetails_R setProducts={setProducts} />
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryReport;
