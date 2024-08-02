import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

const account_detailed1 = JSON.parse(localStorage.getItem("user_info") || "{}");

function Dashboard() {
  return (
    <>
      <NavBar />
      <div>
        Welcome {account_detailed1.first_name} {account_detailed1.last_name}
      </div>
    </>
  );
}

export default Dashboard;
