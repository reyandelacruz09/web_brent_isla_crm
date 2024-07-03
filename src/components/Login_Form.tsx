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
import { Link } from "react-router-dom";

function Login_Form() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="sm:bg-white h-screen grid md:grid-cols-2 grid-cols-1">
        <div className="column w-100 h-screen flex items-center justify-center">
          <div className="w-4/6 h-4/5">
            <div className="flex justify-center pb-10">
              <img
                src="../../images/super_kalan_logo.png"
                alt=""
                className="w-64"
              />
            </div>
            <div className="flex justify-center">
              <form className="w-5/6">
                <div className="mb-6 w-full">
                  <TextField
                    id="filled-required"
                    label="Email"
                    defaultValue=""
                    variant="filled"
                    className="w-full border-b-0"
                  />
                </div>

                <FormControl className="w-full" variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <div className="flex w-full">
                  <div className="w-1/2 justify-center text-sm">
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label={
                        <Typography variant="body2">Remember Me</Typography>
                      }
                    />
                  </div>
                  <div className="w-1/2 justify-center text-right pt-2">
                    <Typography
                      variant="body2"
                      className="cursor-pointer text-blue-500"
                    >
                      Forgot Password
                    </Typography>
                  </div>
                </div>

                <div className="pb-10 mt-3 mb-3 flex justify-center pt-2">
                  <Link to="/dashboard" className="w-full">
                    <Button variant="contained" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <div className="text-sm text-center">Or sign in with</div>
                <div className="pt-3 flex justify-center gap-5">
                  <div className="px-4 py-1 rounded-xl bg-red-200 cursor-pointer">
                    <GoogleIcon sx={{ color: red["900"] }} />
                  </div>
                  <div className="px-4 py-1 rounded-xl bg-blue-200 cursor-pointer">
                    <FacebookRoundedIcon sx={{ color: blue["A700"] }} />
                  </div>
                  <div className="px-4 py-1 rounded-xl bg-gray-200 cursor-pointer">
                    <AppleIcon />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden column w-100 h-screen grid-row md:flex lg:flex xl:flex items-center justify-center bg-[#f3f4f6] relative">
          <div className="h-full flex items-center justify-center ">
            <img
              src="../../images/Login.png"
              alt="login_image"
              className="relative inline-block h-full w-fit object-cover object-center"
            />
            <div className="absolute text-center font-bold bottom-0 pb-10">
              <p>Powered by</p>
              <p>OneDigital System</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_Form;
