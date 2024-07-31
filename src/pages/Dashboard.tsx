import React from "react";
import NavBar from "../components/NavBar";

const account_detailed = JSON.parse(localStorage.getItem("user_info") || "{}");
//console.warn(account_detailed);

function Dashboard() {
  return (
    <>
      <NavBar />
      <div>
        Welcome {account_detailed.first_name} {account_detailed.last_name}
      </div>
    </>
  );
}

export default Dashboard;
