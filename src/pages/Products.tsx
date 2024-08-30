import { SetStateAction, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AddProduct from "../components/product/AddProduct";
import AllProducts from "../components/product/AllProducts";
import { useNavigate } from "react-router-dom";
import { useGetRolesQuery } from "../store";
import { access_roles } from "../Types";
import Restricted from "./Restricted";

function Products() {
  const logDateStr = localStorage.getItem("date");
  let differenceInHours = 0;
  let navigate = useNavigate();

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

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const [roleList, setroleList] = useState<access_roles>({
    id: 0,
    dashboard: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    order: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    products: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    branch: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    order_history: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    inventory: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    user: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    department: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    kb: {
      id: 0,
      name: false,
      access: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    client: "",
    role: "",
  });

  const { data: roles, isSuccess: isRolesSuccess } = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });
  useEffect(() => {
    if (isRolesSuccess && roles) {
      setroleList(roles.data);
    }
  }, [isRolesSuccess, roles]);

  return (
    <>
      <NavBar />
      {roleList.products.access ? (
        <>
          <AddProduct />
          <AllProducts />
        </>
      ) : (
        <Restricted />
      )}
    </>
  );
}

export default Products;
