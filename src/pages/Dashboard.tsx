import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Dashboard_Content from "../components/dashboard/Dashboard_Content";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function Dashboard() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.dashboard.access === true ? (
      <div>
        <Dashboard_Content />
      </div>
    ) : getRolesAPI.data?.data.dashboard.access === false ? (
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

export default Dashboard;
