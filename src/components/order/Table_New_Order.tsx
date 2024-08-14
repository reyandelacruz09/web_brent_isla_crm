//import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { useOrderListQuery } from "../../store";
import { useEffect, useState } from "react";
import { Order } from "./Table_All_Orders";

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

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
}));
function Table_New_Orders() {
  const { data, error, isLoading, isSuccess } = useOrderListQuery("");
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

        if (result.data[i].orderID.status === 1) {
          order.push({
            status: result.data[i].orderID.status,
            id: result.data[i].orderID.id,
            name:
              result.data[i].orderID.customerID.fname +
              " " +
              result.data[i].orderID.customerID.lname,
            assignedbranch: result.data[i].orderID.branch.name,
            amount: result.data[i].grandtotal.toFixed(2),
            ordertaker: result.data[i].orderID.added_by.first_name,
            edt: formattedDate,
            cid: result.data[i].orderID.customerID.id,
          });
        }
      }
      setContent(order);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === 1) {
      return (
        <span className="bg-pink-500 text-white p-2 px-3 rounded-2xl">
          New Order
        </span>
      );
    } else if (params.colDef.field === "name") {
      return (
        <Link to="/customer-details">
          <span className="cursor-pointer font-bold">{params.value}</span>
        </Link>
      );
    }
    return params.value;
  };
  return (
    <>
      <div className="w-full h-full bg-white">
        <StyledDataGrid
          rows={content}
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
      </div>
    </>
  );
}

export default Table_New_Orders;
