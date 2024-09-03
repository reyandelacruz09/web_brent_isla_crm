import React from "react";
import NavBar from "../components/NavBar";
import Settings_Info from "../components/settings/Settings_Info";
import { useNavigate } from "react-router-dom";
import { useGetRolesQuery } from "../store";
import Restricted from "./Restricted";

function Settings() {
  //No current roles in settings module
  // const account_detailed1 = JSON.parse(
  //   localStorage.getItem("account_detail") || "{}"
  // );
  // const getRolesAPI = useGetRolesQuery({
  //   client: account_detailed1.department?.id || 0,
  //   role: account_detailed1.role || 0,
  // });

  // const content =
  //   getRolesAPI.data?.data.settings.access === true ? (
  //     <div>
  //       <Settings_Info />
  //     </div>
  //   ) : getRolesAPI.data?.data.settings.access === false ? (
  //     <div>
  //       <Restricted />
  //     </div>
  //   ) : (
  //     <div></div>
  //   );
  return (
    <>
      <NavBar />
      {/* {content} */}
      <Settings_Info />
    </>
  );
}

export default Settings;
