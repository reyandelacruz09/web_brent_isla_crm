import React from "react";
import NavBar from "../components/NavBar";
import AddDepartment from "../components/department/AddDepartment";
import AllDepartment from "../components/department/AllDepartment";
import { Slide, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Restricted from "./Restricted";
import { useGetRolesQuery } from "../store";

function Department() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.department.access === true ? (
      <div>
        <AddDepartment />
        <AllDepartment />
      </div>
    ) : getRolesAPI.data?.data.department.access === false ? (
      <div>
        <Restricted />
      </div>
    ) : (
      <div></div>
    );
  return (
    <>
      <NavBar />
      {/* <AddDepartment />
      <AllDepartment /> */}
      {content}
    </>
  );
}

export default Department;
