import { useNavigate } from "react-router-dom";
import InventoryReport from "../components/inventory_report/InventoryReport";
import NavBar from "../components/NavBar";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function Inventory() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.inventory.access === true ? (
      <div>
        <InventoryReport />
      </div>
    ) : getRolesAPI.data?.data.inventory.access === false ? (
      <div>
        <Restricted />
      </div>
    ) : (
      <div></div>
    );
  return (
    <>
      <NavBar />
      {content}
    </>
  );
}

export default Inventory;
