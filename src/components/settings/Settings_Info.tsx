import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Restricted from "../../pages/Restricted";

function Settings_Info() {
  const acc_detailed = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  return (
    <>
      <div className="flex justify-center gap-10 p-5">
        <div className="w-1/3 pt-5">
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        <div className="w-1/3"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 flex gap-10 pb-5">
          <div className=" w-1/2">
            <Card sx={{ minWidth: 275, minHeight: 250 }}>
              <CardMedia className="bg-blue-700">
                <Typography
                  variant="h6"
                  component="div"
                  className="py-1 px-2"
                  color="white"
                >
                  General
                </Typography>
              </CardMedia>
              <CardMedia sx={{ height: 5 }} className="bg-green-300" />
              <CardContent>
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  General
                </Typography>
                <Link to="/settings/department">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Department
                  </Typography>
                </Link>
                <Link to="/settings/user">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Users
                  </Typography>
                </Link>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
          <div className=" w-1/2">
            <Card sx={{ minWidth: 275, minHeight: 250 }}>
              <CardMedia className="bg-blue-700">
                <Typography
                  variant="h6"
                  component="div"
                  className="py-1 px-2"
                  color="white"
                >
                  Security
                </Typography>
              </CardMedia>
              <CardMedia sx={{ height: 5 }} className="bg-green-300" />
              <CardContent>
                <Link to="/settings/profile">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Profiles
                  </Typography>
                </Link>
                <Link to="/settings/roles">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Roles and Sharing
                  </Typography>
                </Link>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-2/3 flex gap-10 pb-5">
          <div className="w-1/2">
            <Card sx={{ minWidth: 275, minHeight: 250 }}>
              <CardMedia className="bg-blue-700">
                <Typography
                  variant="h6"
                  component="div"
                  className="py-1 px-2"
                  color="white"
                >
                  Channels
                </Typography>
              </CardMedia>
              <CardMedia sx={{ height: 5 }} className="bg-green-300" />
              <CardContent>
                <a href="/telephony" target="_blank">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Voice Link
                  </Typography>
                </a>
                <a href="/sms" target="_blank">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    SMS
                  </Typography>
                </a>
                <a href="/ticketing" target="_blank">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Ticketing
                  </Typography>
                </a>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
          <div className="w-1/2">
            <Card sx={{ minWidth: 275, minHeight: 250 }}>
              <CardMedia className="bg-blue-700">
                <Typography
                  variant="h6"
                  component="div"
                  className="py-1 px-2"
                  color="white"
                >
                  Automations
                </Typography>
              </CardMedia>
              <CardMedia sx={{ height: 5 }} className="bg-green-300" />
              <CardContent>
                <Link to="/settings/route">
                  <Typography
                    variant="body1"
                    component="div"
                    className="pl-5 py-1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Routing
                  </Typography>
                </Link>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-2/3 flex gap-10 pb-5">
          <div className="w-1/2">
            <Card sx={{ minWidth: 275, minHeight: 250 }}>
              <CardMedia className="bg-blue-700">
                <Typography
                  variant="h6"
                  component="div"
                  className="py-1 px-2"
                  color="white"
                >
                  Data Administration
                </Typography>
              </CardMedia>
              <CardMedia sx={{ height: 5 }} className="bg-green-300" />
              <CardContent>
                {/* <a href="/telephony" target="_blank"> */}
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  Import
                </Typography>
                {/* </a> */}
                {/* <a href="/sms" target="_blank"> */}
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  Export
                </Typography>
                {/* </a> */}
                {/* <a href="/ticketing" target="_blank"> */}
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  Data Backup
                </Typography>
                {/* </a> */}
                {/* <a href="/ticketing" target="_blank"> */}
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  Storage
                </Typography>
                {/* </a> */}
                {/* <a href="/ticketing" target="_blank"> */}
                <Typography
                  variant="body1"
                  component="div"
                  className="pl-5 py-1"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                >
                  Recycle Bin
                </Typography>
                {/* </a> */}
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </>
  );
}

export default Settings_Info;
