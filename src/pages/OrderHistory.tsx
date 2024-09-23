import NavBar from "../components/NavBar";
import OrderHistoryForm from "../components/order_history/OrderHistoryForms";
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
        <OrderHistoryForm />
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
