import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Order_Form from "../components/order/Order_Form";
import Restricted from "./Restricted";
import { useGetRolesQuery } from "../store";

function Order() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.order.access === true ? (
      <div>
        <Order_Form />
      </div>
    ) : getRolesAPI.data?.data.order.access === false ? (
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

export default Order;
