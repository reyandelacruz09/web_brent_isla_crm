import React from "react";
import NavBar from "../components/NavBar";
import AddDepartment from "../components/department/AddDepartment";
import AllDepartment from "../components/department/AllDepartment";
import { Slide, ToastContainer } from "react-toastify";

function Department() {
  return (
    <>
      <NavBar />
      <AddDepartment />
      <AllDepartment />
    </>
  );
}

export default Department;
