//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130 },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "EDT", width: 130 },
];

const rows = [
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
    status: "Completed",
    id: "13",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
];

function Table_Completed_History() {
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

export default Table_Completed_History;
