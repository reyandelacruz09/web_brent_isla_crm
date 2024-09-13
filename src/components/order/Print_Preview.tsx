import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import {
  useCompleteOrderQuery,
  useCompleteOrderTotalQuery,
  useCustomerInfoIDQuery,
  useCustomerOrderIDQuery,
} from "../../store";
import { useEffect, useRef, useState } from "react";
import Date_Format from "./Date_Format";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintTemplate";

interface cust_idProps {
  cust_id: string;
  orderID: string;
}
interface client {
  name: string;
}
interface branch {
  name: string;
  owner: client;
}
interface province {
  name: string;
}
interface city {
  name: string;
  province: province;
}
interface barangay {
  name: string;
  city: city;
}
interface customer {
  lname: string;
  fname: string;
  phone1: string;
  block_unit: string;
  barangay: barangay;
}
interface Order {
  branch: branch;
  expected_deltime: string;
  special_instructions: string;
  time_deliver: string;
  sendsms: string;
  sendemail: string;
  customerID: customer;
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

interface OrderTotal {
  mopayment: string;
  changefor: string;
  changeamount: string;
}

function toProperCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Print_Preview({ cust_id, orderID }: cust_idProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [customerOrder, setCustomerOrder] = useState<Order>({
    branch: {
      name: "",
      owner: {
        name: "",
      },
    },
    customerID: {
      lname: "",
      fname: "",
      phone1: "",
      block_unit: "",
      barangay: {
        name: "",
        city: {
          name: "",
          province: {
            name: "",
          },
        },
      },
    },
    expected_deltime: "",
    special_instructions: "",
    time_deliver: "",
    sendsms: "",
    sendemail: "",
  });

  const { data: custOrder, isSuccess: isCustOrderSuccess } =
    useCustomerOrderIDQuery(orderID || "");

  useEffect(() => {
    if (isCustOrderSuccess && custOrder) {
      setCustomerOrder(custOrder.data);
      // console.log(custOrder.data);
    }
  }, [isCustOrderSuccess, custOrder]);

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

  const [others, setOthers] = useState<OrderTotal>({
    mopayment: "",
    changefor: "",
    changeamount: "",
  });

  const { data: orderInfo, isSuccess: isorderInfoSuccess } =
    useCompleteOrderQuery(orderID || "");

  useEffect(() => {
    if (isorderInfoSuccess && orderInfo) {
      setProductList(orderInfo.data);
    }
  }, [isorderInfoSuccess, orderInfo]);

  const { data: orderTotal, isSuccess: isorderTotalSuccess } =
    useCompleteOrderTotalQuery(orderID || "");

  useEffect(() => {
    if (isorderTotalSuccess && orderTotal) {
      setTotals(orderTotal.data);
      setOthers(orderTotal.data);
    }
  }, [isorderTotalSuccess, orderTotal]);

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen("paper")}
        variant="contained"
        className="w-40 pt-2 h-10"
      >
        Print Preview
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "400px" } }}
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="w-full text-center pt-5">
              <Typography variant="h5" className="text-black">
                {customerOrder.branch.owner.name || ""}
              </Typography>
            </div>
            <div className="w-full text-center pb-3 border-b-2 border-dashed border-slate-400">
              <Typography variant="body2" className="text-black">
                {customerOrder.branch.name || ""}
              </Typography>
            </div>

            <div className="pt-5">
              <Typography variant="body2" className="text-black">
                Fullname: {customerOrder.customerID.fname || ""}{" "}
                {customerOrder.customerID.lname || ""}
              </Typography>
            </div>
            <div className="pt-1">
              <Typography variant="body2" className="text-black">
                Phone No: {customerOrder.customerID.phone1 || ""}
              </Typography>
            </div>
            <div className="pt-1">
              <Typography variant="body2" className="text-black">
                Address: {customerOrder.customerID.block_unit || ""}
                {", "}
                {toProperCase(customerOrder.customerID.barangay.name || "")}
                {", "}
                {toProperCase(
                  customerOrder.customerID.barangay.city.name || ""
                )}
                {", "}
                {toProperCase(
                  customerOrder.customerID.barangay.city.province.name || ""
                )}
              </Typography>
            </div>
            <div className="pt-1">
              <Typography variant="body2" className="text-black">
                EDT:{" "}
                <Date_Format date_formatted={customerOrder.expected_deltime} />
              </Typography>
            </div>
            <div className="pt-1">
              <Typography variant="body2" className="text-black">
                Special Instructions: {customerOrder.special_instructions || ""}
              </Typography>
            </div>
            <div className="py-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="w-2/5 text-left py-2">
                      <Typography variant="body2" className="text-black">
                        Product
                      </Typography>
                    </td>
                    <td className="w-1/5 text-center py-2">
                      <Typography variant="body2" className="text-black">
                        Qty
                      </Typography>
                    </td>
                    <td className="w-1/5 text-center py-2">
                      <Typography variant="body2" className="text-black">
                        Price
                      </Typography>
                    </td>
                    <td className="w-1/5 text-center py-2">
                      <Typography variant="body2" className="text-black">
                        Total
                      </Typography>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((products) => (
                    <tr key={products.id}>
                      <td className=" pt-1">
                        <Typography variant="body2" className="text-black">
                          {products.product.name}
                        </Typography>
                      </td>
                      <td className="text-center pt-1">
                        <Typography variant="body2" className="text-black">
                          {products.quantity}
                        </Typography>
                      </td>
                      <td className="text-right pt-1">
                        <Typography variant="body2" className="text-black">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            parseFloat(products.price ? products.price : "0")
                          )}
                        </Typography>
                      </td>
                      <td className="text-right pt-1">
                        <Typography variant="body2" className="text-black">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            parseFloat(products.total ? products.total : "0")
                          )}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right flex">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Subtotal:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(totals.subtotal ? totals.subtotal : "0")
                  )}
                </Typography>
              </div>
            </div>

            <div className="text-right flex pt-3">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Vatable Sales:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(totals.subtotal ? totals.subtotal : "0") / 1.12
                  )}
                </Typography>
              </div>
            </div>
            <div className="text-right flex">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  VAT Amount:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(totals.subtotal ? totals.subtotal : "0") -
                      parseFloat(totals.subtotal ? totals.subtotal : "0") / 1.12
                  )}
                </Typography>
              </div>
            </div>
            <div className="text-right flex">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Delivery Charged:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(totals.delcharge ? totals.delcharge : "0")
                  )}
                </Typography>
              </div>
            </div>

            <div className="text-right flex pt-3">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Total Bill:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(totals.grandtotal ? totals.grandtotal : "0")
                  )}
                </Typography>
              </div>
            </div>
            <div className="text-right flex">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Cash:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(others.changefor ? others.changefor : "0")
                  )}
                </Typography>
              </div>
            </div>
            <div className="text-right flex pb-10 border-b-2 border-dashed border-slate-400">
              <div className="w-2/3 text-right">
                <Typography variant="body2" className="text-black">
                  Change:
                </Typography>
              </div>
              <div className="w-1/3">
                <Typography variant="body2" className="text-black">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    parseFloat(others.changeamount ? others.changeamount : "0")
                  )}
                </Typography>
              </div>
            </div>
            <div className="py-5"></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="w-32" variant="contained">
            Close
          </Button>
          {/* <Button onClick={handleClose} className="w-32" variant="contained">
            Print
          </Button> */}
          <ReactToPrint
            trigger={() => (
              <Button className="w-32" variant="contained">
                Print
              </Button>
            )}
            content={() => componentRef.current as HTMLElement} // Cast to HTMLElement
            pageStyle="@media print { @page { size: portrait; } }"
          />
        </DialogActions>
      </Dialog>
      <div>
        <div style={{ display: "none" }}>
          <PrintComponent
            ref={componentRef}
            customerOrder={customerOrder}
            productList={productList}
            totals={totals}
            others={others}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Print_Preview;
