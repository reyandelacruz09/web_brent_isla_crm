import Add_Quantity_Modal from "./Add_Quantity_Modal";

interface InventoryDetails_LProps {
  products: {
    id: string;
    code: string;
    name: string;
    owner: string;
    receipt: string;
    released: string;
    stock: string;
  };
}

function InventoryDetails_L({ products }: InventoryDetails_LProps) {
  return (
    <>
      <div>
        <span className="font-bold text-2xl pl-5">Inventory Report</span>
      </div>
      <div className="pt-5">
        <span className="font-bold text-lg pl-5">Product Detail</span>
      </div>
      <div className="py-5 px-3 flex justify-left">
        <div>
          <img
            className="inline-block w-14 object-cover rounded-full"
            src="../../images/avatar.jpg"
            alt=""
          />
        </div>
        <div className="pl-3">
          <span className="font-bold">Orlhie S. Almendares</span>
        </div>
      </div>
      <div className="px-3 py-2">
        <div className=" border-gray-200 border-2 p-3 rounded-lg">
          <div className="hidden">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Product ID
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="id"
                value={products.id}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Product Code
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="code"
                value={products.code}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Product Name
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={products.name}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Product Owner
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={products.owner}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Receipt
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-5"
                value={products.receipt}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Released
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-5"
                value={products.released}
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Available Stock
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-5"
                value={products.stock}
                disabled
              />
            </div>
          </div>
          <div>
            <Add_Quantity_Modal pid={products.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryDetails_L;
