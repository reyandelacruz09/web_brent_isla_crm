//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130, align: "center" },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "Call Type", width: 130 },
];

const rows = [
  {
    status: "New Order",
    id: "1",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "In-Transit",
    id: "2",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "Completed",
    id: "3",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "Received",
    id: "4",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "New Order",
    id: "5",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "New Order",
    id: "6",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "New Order",
    id: "7",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "In-Transit",
    id: "8",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "New Order",
    id: "9",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "New Order",
    id: "10",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "Received",
    id: "11",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "In-Transit",
    id: "12",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "Completed",
    id: "13",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
];

function Table_All_History() {
  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === "New Order") {
      return (
        <span className="bg-pink-500 text-white p-2 px-3 rounded-2xl">
          {params.value}
        </span>
      );
    } else if (
      params.colDef.field === "status" &&
      params.value === "Received"
    ) {
      return (
        <span className="bg-blue-500 text-white p-2 px-3 rounded-2xl">
          {params.value}
        </span>
      );
    } else if (
      params.colDef.field === "status" &&
      params.value === "In-Transit"
    ) {
      return (
        <span className="bg-red-500 text-white p-2 px-3 rounded-2xl">
          {params.value}
        </span>
      );
    } else if (
      params.colDef.field === "status" &&
      params.value === "Completed"
    ) {
      return (
        <span className="bg-green-700 text-white p-2 px-3 rounded-2xl">
          {params.value}
        </span>
      );
    } else if (
      params.colDef.field === "name" &&
      params.value === "Orlhie Almendares"
    ) {
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
        <DataGrid
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: "none",
              },
          }}
          rows={rows}
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

export default Table_All_History;
