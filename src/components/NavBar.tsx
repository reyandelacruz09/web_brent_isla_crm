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
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useGetRolesQuery } from "../store";

interface AccountDetails {
  id?: string;
  first_name?: string;
  last_name?: string;
}

function NavBar() {
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

  const account_detailed: AccountDetails = JSON.parse(
    localStorage.getItem("user_info") || "{}"
  );

  useEffect(() => {
    if (!account_detailed.id) {
      navigate("/");
    }
  }, [account_detailed.id, navigate]);

  const logDateStr = localStorage.getItem("date");
  let differenceInHours = 0;

  if (logDateStr) {
    const logDate = new Date(logDateStr);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - logDate.getTime();
    differenceInHours = differenceInMs / (1000 * 60 * 60);
    if (differenceInHours > 4) {
      localStorage.clear();
      navigate("/");
    } else {
      localStorage.setItem("date", new Date().toISOString());
    }
  }

  const location = useLocation();

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const navigation =
    [
      {
        id: 1,
        path: "/dashboard",
        label: "Dashboard",
        icon: (
          <DashboardOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.dashboard.access,
      },
      {
        id: 2,
        path: "/order",
        label: "Order",
        icon: (
          <ShoppingCartOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.order.access,
      },
      {
        id: 3,
        path: "/products",
        label: "Products",
        icon: (
          <LayersOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.products.access,
      },
      {
        id: 4,
        path: "/branch",
        label: "Branch",
        icon: (
          <AccountTreeOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.branch.access,
      },
      {
        id: 5,
        path: "/order-history",
        label: "Order History",
        icon: (
          <HistoryOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.order_history.access,
      },
      {
        id: 6,
        path: "/inventory",
        label: "Inventory",
        icon: (
          <InventoryOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.inventory.access,
      },
      // {
      //   id: 7,
      //   path: "/user",
      //   label: "User",
      //   icon: (
      //     <PersonOutlineOutlinedIcon
      //       className="align-top wiggle pr-1"
      //       fontSize="small"
      //     />
      //   ),
      //   access: getRolesAPI.data?.data.user.access,
      // },
      // {
      //   id: 8,
      //   path: "/department",
      //   label: "Department",
      //   icon: (
      //     <BedOutlinedIcon className="align-top wiggle pr-1" fontSize="small" />
      //   ),
      //   access: getRolesAPI.data?.data.department.access,
      // },
      {
        id: 9,
        path: "/kb",
        label: "KB",
        icon: (
          <LiveHelpOutlinedIcon
            className="align-top wiggle pr-1"
            fontSize="small"
          />
        ),
        access: getRolesAPI.data?.data.kb.access,
      },
    ] || [];

  const filteredNavigation = navigation.filter((nav) => nav.access);

  return (
    <>
      <div className="w-full flex items-center justify-between px-15 py-2 border-b-2 hide-on-print">
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
          {getRolesAPI.isLoading ? (
            <Skeleton />
          ) : getRolesAPI.error ? (
            "No data available"
          ) : (
            filteredNavigation.map((entry: any) => {
              let classStyle: string;
              entry.path !== location.pathname
                ? entry.path === "/order" &&
                  location.pathname === "/customer-details"
                  ? (classStyle =
                      " inline-block nav 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer activenavbar")
                  : (classStyle =
                      " inline-block nav 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer")
                : (classStyle =
                    " inline-block nav 2xl:mx-4 2xl:py-2 xl:mx-3 xl:py-2 lg:mx-2 md:mx-2 mx-1.5 text-sm cursor-pointer activenavbar");
              return (
                <li key={entry.id} className={classStyle}>
                  <Link to={entry.path}>
                    {entry.icon}
                    {entry.label}
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center gap-5">
          <div
            className={`cursor-pointer ${
              window.location.pathname === "/settings" ||
              window.location.pathname === "/settings/profile" ||
              window.location.pathname === "/settings/roles" ||
              window.location.pathname === "/settings/route" ||
              window.location.pathname === "/settings/user" ||
              window.location.pathname === "/settings/department"
                ? " activenavbar"
                : ""
            }`}
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
