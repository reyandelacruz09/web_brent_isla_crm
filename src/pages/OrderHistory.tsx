import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Order_History_Form from "../components/order_history/Order_history_Forms";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function OrderHistory() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.order_history.access === true ? (
      <div>
        <Order_History_Form />
      </div>
    ) : getRolesAPI.data?.data.order_history.access === false ? (
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

export default OrderHistory;
