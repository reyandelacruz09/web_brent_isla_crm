//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, styled, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useOrderListStatusQuery } from "../../store";
import { useEffect, useState } from "react";
import { Order, Table_All_OrdersProps } from "./Table_All_Orders";

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

function Table_In_Transit({
  search,
  radioVal,
  radioValRT,
}: Table_All_OrdersProps) {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bowner, setBowner] = useState("");

  useEffect(() => {
    switch (radioVal) {
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

  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useOrderListStatusQuery({
    owner: account_detailed1.department.id,
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
    status: 3,
    rt_type: radioValRT,
  });
  const [content, setContent] = useState<Order[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      result = data.results;

      const size = Object.keys(result).length;
      const order: Order[] = [];

      for (let i = 0; i < size; i++) {
        const dateStr = result[i].orderID.expected_deltime;
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
          status: result[i].orderID.status,
          id: result[i].orderID.id,
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
        });
      }
      console.log(order);
      setContent(order);
      setTotalCount(data.count);
    }
  }, [data, isSuccess]);

  const handleNameClick = (name: string, orderID: string) => {
    localStorage.setItem("view_cust", name);
    localStorage.setItem("view_id", orderID);
    navigate("/customer-details");
  };

  const renderCell = (params: any) => {
    if (params.colDef.field === "status" && params.value === 3) {
      return (
        <span className="bg-purple-700 text-white p-2 px-3 rounded-2xl">
          In-Transit
        </span>
      );
    } else if (params.colDef.field === "name") {
      return (
        <span
          className="cursor-pointer font-bold"
          onClick={() => handleNameClick(params.row.cid, params.row.id)}
        >
          {params.value === " " ? params.row.custname : params.value}
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
            rows={loadingNextPage || isLoading ? [] : filteredContent}
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

export default Table_In_Transit;
