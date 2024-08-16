import { useState } from "react";
import NavBar from "../NavBar";
import CustomerDetails_L from "./CustomerDetails_L";
import CustomerDetails_R1 from "./CustomerDetails_R1";
import CustomerDetails_R2 from "./CustomerDetails_R2";
import CustomerDetails_R3 from "./CustomerDetails_R3";

function CustomerDetails() {
  const cust_id = JSON.parse(localStorage.getItem("view_cust") || "{}");

  const [orderID, setOrderID] = useState<string>("");

  return (
    <>
      <NavBar />
      <div className="px-10 pt-5 flex">
        <div className="w-1/4 h-64 pt-3">
          <CustomerDetails_L cust_id={cust_id} orderID={orderID} />
        </div>
        <div className="pt-3 w-3/4">
          <div className="w-full">
            <CustomerDetails_R1 orderID={orderID} />
          </div>
          <div className="w-full">
            <CustomerDetails_R2 orderID={orderID} />
          </div>
          <div className="w-full">
            <CustomerDetails_R3 cust_id={cust_id} setOrderID={setOrderID} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
