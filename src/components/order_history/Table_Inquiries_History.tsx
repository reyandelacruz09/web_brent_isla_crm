//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { useOrderListQuery, useViewComplaintsQuery } from "../../store";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 150 },
  { field: "idorder", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "owner", headerName: "Owner", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "Type", width: 130 },
];

interface complaint {
  status: string;
  id: string;
  name: string;
  assignedbranch: string;
  owner: string;
  ordertaker: string;
  edt: string;
  idorder: string;
}
function Table_Inquiries_History() {
  const { data, error, isLoading, isSuccess } = useViewComplaintsQuery("");
  const [listComplaint, setListComplaint] = useState<complaint[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      const size = result.data?.length || 0;
      const complaint: complaint[] = [];

      for (let i = 0; i < size; i++) {
        const orderID = result.data[i]?.orderID;
        const expectedDeltime = orderID?.expected_deltime || "";

        let formattedDate = "";
        if (expectedDeltime) {
          const date = new Date(expectedDeltime);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const hours = date.getHours();
          const minutes = date.getMinutes();

          formattedDate = `${month}/${day}/${year} ${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        }
        complaint.push({
          status: result.data[i]?.complaint === "Canceled Order" ? "1" : "2",
          idorder: result.data[i]?.id || "", // Safeguard against undefined orderID
          name:
            result.data[i]?.orderID.customerID.fname +
              " " +
              result.data[i]?.orderID.customerID?.lname || "",
          assignedbranch: result.data[i]?.orderID.branch.name || "",
          owner: result.data[i]?.orderID.branch.owner.name || "",
          ordertaker: result.data[i]?.added_by?.fullname || "",
          edt:
            result.data[i]?.complaint === "Canceled Order"
              ? "Order"
              : "Inquiry",
          id: result.data[i]?.id || "", // Safeguard against undefined id
        });
      }

      setListComplaint(complaint);
    }
  }, [data, isSuccess]);

  console.log("Data passed to DataGrid:", listComplaint);

  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === "1") {
      return (
        <span className="bg-red-500 text-white p-2 px-3 rounded-2xl">
          Canceled Order
        </span>
      );
    } else if (params.colDef.field === "status" && params.value === "2") {
      return (
        <div className="text-center">
          <span className="bg-slate-400 text-white p-2 px-3 rounded-2xl">
            &emsp;&emsp;Inquiry&emsp;&emsp;
          </span>
        </div>
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
          rows={listComplaint}
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

export default Table_Inquiries_History;
