// PrintComponent.tsx
import React, { forwardRef } from "react";
import { Typography } from "@mui/material";
import Date_Format from "./Date_Format"; // Import your Date_Format component if needed

interface CustomerOrder {
  branch: {
    name: string;
    owner: {
      name: string;
    };
  };
  customerID: {
    lname: string;
    fname: string;
    phone1: string;
    block_unit: string;
    barangay: {
      name: string;
      city: {
        name: string;
        province: {
          name: string;
        };
      };
    };
  };
  expected_deltime: string;
  special_instructions: string;
}

interface Product {
  id: string;
  product: {
    name: string;
  };
  price: string;
  quantity: string;
  discount: string;
  total: string;
}

interface Totals {
  subtotal: string;
  delcharge: string;
  total_discount: string;
  grandtotal: string;
}

interface Others {
  mopayment: string;
  changefor: string;
  changeamount: string;
}

interface PrintComponentProps {
  customerOrder: CustomerOrder;
  productList: Product[];
  totals: Totals;
  others: Others;
}

const PrintTemplate = forwardRef<HTMLDivElement, PrintComponentProps>(
  ({ customerOrder, productList, totals, others }, ref) => {
    const toProperCase = (str: string) => {
      if (!str) return "";
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return (
      <div ref={ref} className="bg-red-200 w-2/5 px-2">
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
            {toProperCase(customerOrder.customerID.barangay.city.name || "")}
            {", "}
            {toProperCase(
              customerOrder.customerID.barangay.city.province.name || ""
            )}
          </Typography>
        </div>
        <div className="pt-1">
          <Typography variant="body2" className="text-black">
            EDT: <Date_Format date_formatted={customerOrder.expected_deltime} />
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
              }).format(parseFloat(totals.subtotal ? totals.subtotal : "0"))}
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
              }).format(parseFloat(totals.delcharge ? totals.delcharge : "0"))}
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
              }).format(parseFloat(others.changefor ? others.changefor : "0"))}
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
      </div>
    );
  }
);

export default PrintTemplate;
