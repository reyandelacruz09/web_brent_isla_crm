import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Order_Form from "../components/order/Order_Form";

function Order() {
  const logDateStr = localStorage.getItem("date");
  let differenceInHours = 0;
  let navigate = useNavigate();

  if (logDateStr) {
    const logDate = new Date(logDateStr);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - logDate.getTime();
    differenceInHours = differenceInMs / (1000 * 60 * 60);
    if (differenceInHours > 4) {
      localStorage.clear();
      navigate("/");
    } else {
      localStorage.setItem("date", new Date().toISOString());
    }
  }
  return (
    <>
      <NavBar />
      <Order_Form />
    </>
  );
}

export default Order;
