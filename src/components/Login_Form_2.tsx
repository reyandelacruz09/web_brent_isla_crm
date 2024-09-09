import * as React from "react";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import { red, blue } from "@mui/material/colors";

import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login_Form_2() {
  return (
    <>
      <div className="sm:bg-white h-screen grid md:grid-cols-1 grid-cols-1">
        <div className="column w-100 h-screen flex items-center justify-center">
          <div className="w-4/6 h-full">
            <div className="flex justify-center pt-5 pb-5">
              <img
                src="../../images/OODC_hres.png"
                alt="OODC_Logo"
                className="w-28"
              />
            </div>
            <div className="flex justify-center">
              <Typography variant="h6">
                <b>One Outsource Group Corporation</b>
              </Typography>
            </div>

            <div className="flex w-full pt-10">
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <img
                    src="../../images/Hatid_Bahay.png"
                    alt="OODC_Logo"
                    className="w-52 h-72"
                  />
                </Link>
              </div>
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <img
                    src="../../images/Marketing.png"
                    alt="OODC_Logo"
                    className="w-52 h-72"
                  />
                </Link>
              </div>
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <img
                    src="../../images/Road_Transport.png"
                    alt="OODC_Logo"
                    className="w-52 h-72"
                  />
                </Link>
              </div>
            </div>

            <div className="flex w-full pt-5">
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <Typography>
                    <b>Hatid Bahay</b>
                  </Typography>
                </Link>
              </div>
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <Typography>
                    <b>Marketing</b>
                  </Typography>
                </Link>
              </div>
              <div className="w-1/3 flex justify-center">
                <Link to="/dashboard">
                  <Typography>
                    <b>Road Transport</b>
                  </Typography>
                </Link>
              </div>
            </div>

            <div className="flex justify-center pt-14">
              <Typography variant="body1">
                <b>Powered by</b>
              </Typography>
            </div>

            <div className="flex justify-center">
              <Typography variant="body1">
                <b>One Outsource Direct</b>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_Form_2;
