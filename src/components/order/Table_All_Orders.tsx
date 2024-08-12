//import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { useOrderListQuery } from "../../store";
import { useEffect, useState } from "react";

interface Order {
  status: string;
  id: string;
  name: string;
  assignedbranch: string;
  amount: string;
  ordertaker: string;
  edt: string;
}

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130, align: "center" },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "EDT", width: 130 },
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

const theme = createTheme();
function Table_All_Orders() {
  const { data, error, isLoading, isSuccess } = useOrderListQuery("");
  const [content, setContent] = useState<Order[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const order: Order[] = [];

      for (let i = 0; i < size; i++) {
        order.push({
          status: result.data[i].orderID.status,
          id: result.data[i].orderID.id,
          name:
            result.data[i].orderID.customerID.fname +
            " " +
            result.data[i].orderID.customerID.lname,
          assignedbranch: result.data[i].orderID.branch.name,
          amount: result.data[i].grandtotal,
          ordertaker: result.data[i].orderID.added_by.first_name,
          edt: result.data[i].orderID.expected_deltime,
        });
      }

      setContent(order);
      // console.warn("Size", size);
    }
  }, [data, isSuccess]);

  console.warn("Order List", content);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

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
      <ThemeProvider theme={theme}>
        <div className="w-full h-full bg-white">
          <DataGrid
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
      </ThemeProvider>
    </>
  );
}

export default Table_All_Orders;
