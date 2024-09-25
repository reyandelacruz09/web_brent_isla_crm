import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddUser from "../components/user/AddUser";
import AllUser from "../components/user/AllUser";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function User() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.user.access === true ? (
      <div>
        <AddUser />
        <AllUser />
      </div>
    ) : getRolesAPI.data?.data.user.access === false ? (
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
      {/* <AddUser />
      <AllUser /> */}
    </>
  );
}

export default User;
