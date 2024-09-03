import { SetStateAction, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AddProduct from "../components/product/AddProduct";
import AllProducts from "../components/product/AllProducts";
import { useNavigate } from "react-router-dom";
import { useGetRolesQuery } from "../store";
import { access_roles } from "../Types";
import Restricted from "./Restricted";
import { Skeleton } from "@mui/material";

function Products() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const content =
    getRolesAPI.data?.data.products.access === true ? (
      <div>
        <AddProduct />
        <AllProducts />
      </div>
    ) : getRolesAPI.data?.data.products.access === false ? (
      <div>
        <Restricted />
      </div>
    ) : (
      <div></div>
    );

  return (
    <>
      <NavBar />
      {content}
    </>
  );
}

export default Products;
