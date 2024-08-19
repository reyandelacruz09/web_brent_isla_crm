import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListIcon from "@mui/icons-material/List";
import { Button, styled } from "@mui/material";
import { useCompleteOrderQuery } from "../../store";

interface cust_idProps {
  orderID: string;
}
interface ProductTotal {
  subtotal: string;
  delcharge: string;
  total_discount: string;
  grandtotal: string;
}
interface ProductName {
  name: string;
}
interface ProductList {
  id: string;
  product: ProductName;
  price: string;
  quantity: string;
  discount: string;
  total: string;
}
function Modal_ProductOrder({ orderID }: cust_idProps) {
  const StyledTableCell = styled(TableCell)({
    padding: 0,
  });

  const [totals, setTotals] = useState<ProductTotal>({
    subtotal: "",
    delcharge: "",
    total_discount: "",
    grandtotal: "",
  });

  const [productList, setProductList] = useState<ProductList[]>([
    {
      id: "",
      product: {
        name: "",
      },
      price: "",
      quantity: "",
      discount: "",
      total: "",
    },
  ]);

  const { data: orderInfo, isSuccess: isorderInfoSuccess } =
    useCompleteOrderQuery(orderID || "");

  useEffect(() => {
    if (isorderInfoSuccess && orderInfo) {
      // setOthers1(orderInfo.data);
      setTotals(orderInfo.data.order_total[0]);
      setProductList(orderInfo.data.order_product);
      console.warn("haha", orderInfo.data);
    }
  }, [isorderInfoSuccess, orderInfo]);

  return (
    <>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-3 mt-3">
          <span className="text-lg font-bold">
            <ListIcon className="align-top" /> Product Order
          </span>
        </div>
      </div>
      <div className="pt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-gray-300 w-2/6">Product</TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Unit Price
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Qty
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Discount
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productList.map((products) => (
                <TableRow key={products.id}>
                  <StyledTableCell className="w-2/6 ">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={products.product.name}
                      disabled
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      value={parseFloat(products.price).toFixed(2)}
                      disabled
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      value={parseFloat(products.quantity).toFixed(2)}
                      disabled
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      value={parseFloat(products.discount).toFixed(2)}
                      disabled
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      value={parseFloat(products.total).toFixed(2)}
                      disabled
                    />
                  </StyledTableCell>
                </TableRow>
              ))}

              <TableRow>
                <StyledTableCell
                  colSpan={5}
                  align="right"
                  className="h-5"
                ></StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Subtotal</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    value={parseFloat(totals.subtotal).toFixed(2)}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Delivery Charged</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    value={parseFloat(totals.delcharge).toFixed(2)}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Discount</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    value={parseFloat(totals.total_discount).toFixed(2)}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Grand Total</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    value={parseFloat(totals.grandtotal).toFixed(2)}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Modal_ProductOrder;
