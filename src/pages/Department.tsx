import React from "react";
import NavBar from "../components/NavBar";
import AddDepartment from "../components/department/AddDepartment";
import AllDepartment from "../components/department/AllDepartment";
import { Slide, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Department() {
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
      <AddDepartment />
      <AllDepartment />
    </>
  );
}

export default Department;
