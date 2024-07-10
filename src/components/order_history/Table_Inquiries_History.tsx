//import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 150 },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "EDT", width: 130 },
];

const rows = [
  {
    status: "Cancelled Order",
    id: "4",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
  {
    status: "Cancelled Order",
    id: "11",
    name: "Orlhie Almendares",
    assignedbranch: "Makati Branch",
    amount: "100",
    ordertaker: "Superman",
    edt: "6/23/2024 14:25",
  },
];

const theme = createTheme();
function Table_Inquiries_History() {
  const renderCell = (params: any) => {
    if (
      params.colDef.field === "status" &&
      params.value === "Cancelled Order"
    ) {
      return (
        <span className="bg-red-500 text-white p-2 px-3 rounded-2xl">
          {params.value}
        </span>
      );
    }
    return params.value;
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="w-full h-full bg-white">
          <DataGrid
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
      </ThemeProvider>
    </>
  );
}

export default Table_Inquiries_History;
