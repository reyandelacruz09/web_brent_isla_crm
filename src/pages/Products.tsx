import { SetStateAction, useState } from "react";
import NavBar from "../components/NavBar";
import AddProduct from "../components/product/AddProduct";
import AllProducts from "../components/product/AllProducts";

function Products() {
  return (
    <>
      <NavBar />
      <AddProduct />
      <AllProducts />
    </>
  );
}

export default Products;
