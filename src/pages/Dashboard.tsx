import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Dashboard_Content from "../components/dashboard/Dashboard_Content";

function Dashboard() {
  return (
    <>
      <NavBar />
      <Dashboard_Content />
    </>
  );
}

export default Dashboard;
