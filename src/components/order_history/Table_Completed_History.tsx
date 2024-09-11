//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useOrderListQuery, useViewComplaintsQuery } from "../../store";
import { useEffect, useState } from "react";

export interface Order {
  status: string;
  id: string;
  neworderID: string;
  name: string;
  assignedbranch: string;
  amount: string;
  ordertaker: string;
  edt: string;
  cid: string;
}

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130, align: "center" },
  { field: "neworderID", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "Date", width: 150 },
];

function Table_Completed_History() {
  const navigate = useNavigate();
  const {
    data: OrderData,
    error: OrderError,
    isLoading: OrderIsLoading,
    isSuccess: OrderIsSuccess,
  } = useOrderListQuery("");
  const { data: Complaintdata, isSuccess: ComplaintisSuccess } =
    useViewComplaintsQuery("");
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    if (OrderIsSuccess) {
      let result: any = [];
      result = OrderData;

      const size = Object.keys(result.data).length;
      const order: Order[] = [];

      for (let i = 0; i < size; i++) {
        const dateStr = result.data[i].orderID.completed_date;
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${month}/${day}/${year} ${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        if (result.data[i].orderID.status == 4) {
          let newid = i + 100000000000;
          order.push({
            status: result.data[i].orderID.status,
            neworderID: result.data[i].orderID.orderID,
            id: newid.toString(),
            name:
              result.data[i].orderID.customerID.fname +
              " " +
              result.data[i].orderID.customerID.lname,
            assignedbranch: result.data[i].orderID.branch.name,
            amount: result.data[i].grandtotal.toFixed(2),
            ordertaker: result.data[i].orderID.added_by.fullname,
            edt: formattedDate,
            cid: result.data[i].orderID.customerID.id,
          });
        }
      }
      setOrder(order);
      console.log("Order: ", order);
    }
  }, [OrderData, OrderIsSuccess]);

  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === 4) {
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
          // onClick={() => handleNameClick(params.row.cid)}
        >
          {params.value}
        </span>
      );
    } else if (params.colDef.field === "amount") {
      return (
        <div className="text-right pr-5">
          <span>
            {params.value === "N/A"
              ? "N/A"
              : new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(parseFloat(params.value ? params.value : "0"))}
          </span>
        </div>
      );
    }

    if (params.colDef.field === "status" && params.value === "2") {
      return (
        <div className="text-center">
          <span className="bg-slate-400 text-white p-2 px-3 rounded-2xl">
            &emsp;Inquiry&emsp;
          </span>
        </div>
      );
    }

    return params.value;
  };

  return (
    <>
      <div className="w-full h-full bg-white">
        {OrderIsLoading ? (
          <Skeleton />
        ) : OrderError ? (
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
            rows={order}
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

export default Table_Completed_History;
