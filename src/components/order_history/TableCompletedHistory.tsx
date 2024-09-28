//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useOrderListHistoryQuery, useViewComplaintsQuery } from "../../store";
import { useEffect, useState } from "react";
import { Order, Table_All_History_Props } from "./TableAllHistory";
import Show_Order_Details from "./ShowOrderDetails";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 130, align: "center" },
  { field: "neworderID", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "assignedbranch", headerName: "Assigned Branch", width: 200 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "ordertaker", headerName: "Order Taker", width: 150 },
  { field: "edt", headerName: "Date", width: 150 },
];

function Table_Completed_History({ search, owner }: Table_All_History_Props) {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalComplaint, setTotalComplaint] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [bowner, setBowner] = useState("");

  useEffect(() => {
    switch (owner) {
      case "hb":
        setBowner("3");
        break;
      case "rt":
        setBowner("4");
        break;
      default:
        setBowner("");
        break;
    }
  });

  const {
    data: OrderData,
    error: OrderError,
    isLoading: OrderIsLoading,
    isSuccess: OrderIsSuccess,
  } = useOrderListHistoryQuery({
    owner: bowner,
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });

  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    if (OrderIsSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      result = OrderData.results;

      const size = Object.keys(result).length;
      const order: Order[] = [];

      for (let i = 0; i < size; i++) {
        const dateStr = result[i].orderID.completed_date;
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${month}/${day}/${year} ${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        if (result[i].orderID.status == 4) {
          let newid = i + 100000000000;
          order.push({
            status: result[i].orderID.status,
            neworderID: result[i].orderID.orderID,
            id: newid.toString(),
            custname: result[i].orderID.customerID.customername,
            name:
              result[i].orderID.customerID.fname +
              " " +
              result[i].orderID.customerID.lname,
            assignedbranch: result[i].orderID.branch.name,
            amount: result[i].grandtotal.toFixed(2),
            ordertaker: result[i].orderID.added_by.fullname,
            edt: formattedDate,
            cid: result[i].orderID.customerID.id,
            type: "order",
          });
        }
      }
      setOrder(order);
      setTotalCount(OrderData.count);
      // console.log("Order: ", order);
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
        <span className="cursor-pointer font-bold">
          <Show_Order_Details
            cust_id={params.row.cid}
            orderID={params.row.neworderID}
            name={params.value === " " ? params.row.custname : params.value}
            type={params.row.type}
          />
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

  const filteredContent = order.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.assignedbranch.toLowerCase().includes(search.toLowerCase())
  );
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
            rows={filteredContent}
            columns={columns.map((col) => ({
              ...col,
              renderCell: renderCell,
            }))}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 10,
                },
              },
            }}
            paginationMode="server"
            pagination
            paginationModel={{ page, pageSize }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            rowCount={totalCount}
            onPaginationModelChange={(newModel) => {
              setPage(newModel.page);
              setPageSize(newModel.pageSize);
              setLoadingNextPage(true);
            }}
            loading={loadingNextPage}
            hideFooterSelectedRowCount
          />
        )}
      </div>
    </>
  );
}

export default Table_Completed_History;
