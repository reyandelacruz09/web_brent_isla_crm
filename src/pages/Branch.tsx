import { useNavigate } from "react-router-dom";
import AddBranch from "../components/branch/AddBranch";
import AllBranches from "../components/branch/AllBranches";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useGetRolesQuery } from "../store";
import { access_roles } from "../Types";
import Restricted from "./Restricted";

function Branch() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.branch.access === true ? (
      <div>
        <AddBranch />
        <AllBranches />
      </div>
    ) : getRolesAPI.data?.data.branch.access === false ? (
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

export default Branch;
