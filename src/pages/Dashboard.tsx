import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Dashboard_Content from "../components/dashboard/Dashboard_Content";

function Dashboard() {
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
      <Dashboard_Content />
    </>
  );
}

export default Dashboard;
