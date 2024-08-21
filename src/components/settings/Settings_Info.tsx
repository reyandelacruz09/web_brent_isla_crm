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

function Settings_Info() {
  return (
    <>
      <div className="flex justify-center gap-10 p-5">
        <div className="w-1/3 pt-5">
          {/* <input
            type="text"
            id="input-group-1"
            name="discount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
            placeholder="Search"
          /> */}
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
      <div className="flex justify-center gap-10 p-5">
        <div className=" w-1/3">
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
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
        <div className=" w-1/3">
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
              {/* <Link to="/settings/roles"> */}
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
              {/* </Link> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Settings_Info;
