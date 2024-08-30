import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddUser from "../components/user/AddUser";
import AllUser from "../components/user/AllUser";

function User() {
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
      <AddUser />
      <AllUser />
    </>
  );
}

export default User;
