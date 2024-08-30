import React from "react";
import NavBar from "../components/NavBar";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@mui/material";

function Restricted() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center pb-32">
        <div className="flex justify-center mb-4">
          <LockIcon sx={{ width: 60, height: 60 }} />
        </div>
        <div className="text-center">
          <Typography variant="h5">
            You dont have access to this module. Please ask administrator!
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Restricted;
