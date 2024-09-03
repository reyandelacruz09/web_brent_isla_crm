import React from "react";
import NavBar from "../components/NavBar";
import KBDetails from "../components/KB/KBDetails";
import { useNavigate } from "react-router-dom";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function KB() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.kb.access === true ? (
      <div>
        <KBDetails />
      </div>
    ) : getRolesAPI.data?.data.kb.access === false ? (
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

export default KB;
