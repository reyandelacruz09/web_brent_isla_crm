import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { useOrderListCustomerQuery } from "../../store";
import { useEffect, useState } from "react";
import { Order } from "./Table_All_Orders";
import Skeleton from "@mui/material/Skeleton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "status", headerName: "Status", width: 150, align: "center" },
  { field: "edt", headerName: "EDT", width: 130 },
];

interface cust_idProps {
  cust_id: string;
  setOrderID: (orderID: string) => void;
}

function CustomerDetails_R3({ cust_id, setOrderID }: cust_idProps) {
  const { data, error, isLoading, isSuccess } =
    useOrderListCustomerQuery(cust_id);
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

        order.push({
          status: result.data[i].orderID.status,
          id: result.data[i].orderID.id,
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

      setContent(order);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  } else if (error) {
    return <div>Error loading data</div>;
  }

  const handleRowClick = (params: any) => {
    setOrderID(params.row.id);
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
    } else if (params.colDef.field === "amount") {
      return (
        <div className="text-right">
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(parseFloat(params.value ? params.value : "0"))}
        </div>
      );
    } else if (params.colDef.field === "ordertaker") {
      return <div className="text-center">{params.value}</div>;
    }
    return params.value;
  };

  return (
    <>
      <div className="pt-3">
        <div className="p-3">
          <div className="pb-3">
            <span className="font-bold text-lg">Order History</span>
          </div>
          <div className="p-3 bg-gray-200">
            <div className="h-100 w-4/4 flex justify-center items-center">
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
                  onRowClick={handleRowClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails_R3;
