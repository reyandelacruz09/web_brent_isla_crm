//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, styled, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useOrderListQuery } from "../../store";
import { useEffect, useState } from "react";

export interface Order {
  status: string;
  id: string;
  name: string;
  assignedbranch: string;
  amount: string;
  ordertaker: string;
  edt: string;
  cid: string;
}

export interface Table_All_OrdersProps {
  search: string;
}

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130, align: "center" },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130, align: "right" },
  {
    field: "ordertaker",
    headerName: "Order Taker",
    width: 180,
    align: "center",
  },
  { field: "edt", headerName: "EDT", width: 130 },
];

function Table_All_Orders({ search }: Table_All_OrdersProps) {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useOrderListQuery({
    owner: account_detailed1.department.id,
  });
  const [content, setContent] = useState<Order[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const order: Order[] = [];

      for (let i = 0; i < size; i++) {
        const dateStr = result.data[i].orderID.expected_deltime;
        const date = new Date(dateStr);

        // Format the date components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${month}/${day}/${year} ${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        let name = "";

        if (result.data[i].orderID.customerID.fname === " ") {
          name = result.data[i].orderID.customerID.customername;
        } else {
          name =
            result.data[i].orderID.customerID.fname +
            " " +
            result.data[i].orderID.customerID.lname;
        }

        order.push({
          status: result.data[i].orderID.status,
          id: result.data[i].orderID.id,
          name: name,
          assignedbranch: result.data[i].orderID.branch.name,
          amount: result.data[i].grandtotal.toFixed(2),
          ordertaker: result.data[i].orderID.added_by.fullname,
          edt: formattedDate,
          cid: result.data[i].orderID.customerID.id,
        });
      }

      setContent(order);
    }
  }, [data, isSuccess]);

  const handleNameClick = (name: string, orderID: string) => {
    localStorage.setItem("view_cust", name);
    localStorage.setItem("view_id", orderID);
    navigate("/customer-details");
  };

  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === 1) {
      return (
        <span className="bg-pink-500 text-white p-2 px-3 rounded-2xl">
          New Order
        </span>
      );
    } else if (params.colDef.field === "status" && params.value === 2) {
      return (
        <span className="bg-blue-500 text-white p-2 px-3 rounded-2xl">
          Received
        </span>
      );
    } else if (params.colDef.field === "status" && params.value === 3) {
      return (
        <span className="bg-purple-700 text-white p-2 px-3 rounded-2xl">
          In-Transit
        </span>
      );
    } else if (params.colDef.field === "status" && params.value === 4) {
      return (
        <span className="bg-green-700 text-white p-2 px-3 rounded-2xl">
          Completed
        </span>
      );
    } else if (params.colDef.field === "status" && params.value === 5) {
      return (
        <span className="bg-red-700 text-white p-2 px-3 rounded-2xl">
          Canceled
        </span>
      );
    } else if (params.colDef.field === "name") {
      return (
        <span
          className="cursor-pointer font-bold"
          onClick={() => handleNameClick(params.row.cid, params.row.id)}
        >
          {params.value}
        </span>
      );
    } else if (params.colDef.field === "amount") {
      return (
        <span>
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(parseFloat(params.value ? params.value : "0"))}
        </span>
      );
    }

    return params.value;
  };

  const filteredContent = content.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.assignedbranch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full h-full bg-white">
        {isLoading ? (
          <Skeleton />
        ) : error ? (
          "No data available"
        ) : (
          <DataGrid
            sx={{
              height: "515px",
              [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                {
                  outline: "none",
                },
            }}
            rowHeight={40}
            rows={filteredContent}
            columns={columns.map((col) => ({
              ...col,
              renderCell: renderCell,
            }))}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            hideFooterSelectedRowCount
          />
        )}
      </div>
    </>
  );
}

export default Table_All_Orders;
