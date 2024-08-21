import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";

const account_detailed = JSON.parse(localStorage.getItem("user_info") || "{}");
interface AccountDetails {
  id?: string;
  first_name?: string;
  last_name?: string;
}

function NavBar() {
  let url = window.location.pathname;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  let account_detailed: AccountDetails = {};

  try {
    account_detailed = JSON.parse(localStorage.getItem("user_info") || "{}");
  } catch (e) {
    console.error("Error parsing user info from localStorage", e);
  }

  useEffect(() => {
    if (!account_detailed.id) {
      navigate("/");
    }
  }, [account_detailed.id, navigate]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-15 py-2 border-b-2">
        {/* sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-orange-500 2xl:bg-red-500 */}
        <img
          src="../../images/OODC_logo.png"
          alt=""
          className="hidden 2xl:block xl:block lg:block 2xl:w-32 2xl:ml-10 xl:w-28 xl:ml-10 lg:ml-5 w-24 cursor-pointer"
        />
        <img
          src="../../images/OODC_logo_only.png"
          alt=""
          className="hidden 2xl:hidden xl:hidden lg:hidden md:block w-7 cursor-pointer ml-5"
        />

        <ul className="list-none text-center">
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 md:text-sm mx-1.5 text-sm cursor-pointer" +
              (url === "/dashboard" ? " activenavbar" : "")
            }
          >
            <Link to="/dashboard">
              <DashboardOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Dashboard</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/order" || url === "/customer-details"
                ? " activenavbar"
                : "")
            }
          >
            <Link to="/order">
              <ShoppingCartOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Order</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/products" ? " activenavbar" : "")
            }
          >
            <Link to="/products">
              <LayersOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Products</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/branch" ? " activenavbar" : "")
            }
          >
            <Link to="/branch">
              <AccountTreeOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Branch</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/order-history" ? " activenavbar" : "")
            }
          >
            <Link to="/order-history">
              <HistoryOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Order History</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/inventory" ? " activenavbar" : "")
            }
          >
            <Link to="/inventory">
              <InventoryOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">Inventory</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/user" ? " activenavbar" : "")
            }
          >
            <Link to="/user">
              <PersonOutlineOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">User</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/department" ? " activenavbar" : "")
            }
          >
            <Link to="/department">
              <BedOutlinedIcon className="align-top wiggle" fontSize="small" />
              <a className=" pl-1">Department</a>
            </Link>
          </li>
          <li
            className={
              "nav inline-block 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer" +
              (url === "/kb" ? " activenavbar" : "")
            }
          >
            <Link to="/kb">
              <LiveHelpOutlinedIcon
                className="align-top wiggle"
                fontSize="small"
              />
              <a className=" pl-1">KB</a>
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <div
            className={
              url === "/settings" ||
              url === "/settings/profile" ||
              url === "/settings/roles"
                ? " activenavbar"
                : ""
            }
          >
            <Link to="/settings">
              <SettingsOutlinedIcon className="cursor-pointer wiggle nav" />
            </Link>
          </div>
          <div>
            <NotificationsNoneOutlinedIcon className="cursor-pointer wiggle nav" />
          </div>
          <div>
            <img
              className="inline-block 2xl:w-8 2xl:mr-10 xl:w-8 xl:mr-10 lg:mr-5 md:w-8 cursor-pointer mr-5 h-18 w-6 object-cover rounded-full ring-2 ring-white"
              src="../../images/avatar.jpg"
              alt=""
              onClick={handleOpenUserMenu}
            />
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <button onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
