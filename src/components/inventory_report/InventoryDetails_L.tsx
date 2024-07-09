function InventoryDetails_L() {
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
          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Product Code
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
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
                placeholder=""
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
                placeholder=""
              />
            </div>
          </div>

          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              On-Hand
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>

          <div className="">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Ordered
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
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
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryDetails_L;
