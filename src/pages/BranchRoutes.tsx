import React from "react";
import NavBar from "../components/NavBar";
import AddRoutes from "../components/settings/Routes/AddRoutes";
import AllRoutes from "../components/settings/Routes/AllRoutes";
import Restricted from "./Restricted";

function BranchRoutes() {
  const acc_detailed = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const content =
    acc_detailed.role === 1 ? (
      <div>
        <Restricted />
      </div>
    ) : (
      <>
        <AddRoutes />
        <AllRoutes />
      </>
    );

  return (
    <>
      <NavBar />
      {content}
    </>
  );
}

export default BranchRoutes;
