//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import { useOrderListQuery, useViewComplaintsQuery } from "../../store";
import { useEffect, useState } from "react";
import { Table_All_History_Props } from "./TableAllHistory";
import ShowOrderDetails from "./ShowOrderDetails";

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
interface Complaint {
  status: string;
  neworderID: string;
  id: string;
  name: string;
  assignedbranch: string;
  amount: string;
  ordertaker: string;
  edt: string;
  cid: string;
  type: string;
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

function Table_Inquiries_History({ search }: Table_All_History_Props) {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const {
    data: OrderData,
    error: OrderError,
    isLoading: OrderIsLoading,
    isSuccess: OrderIsSuccess,
  } = useOrderListQuery({
    owner: account_detailed1.department.id,
  });
  const { data: Complaintdata, isSuccess: ComplaintisSuccess } =
    useViewComplaintsQuery("");
  const [order, setOrder] = useState<Order[]>([]);
  const [complaint, setComplaint] = useState<Complaint[]>([]);
  const [combined, setCombined] = useState<(Order | Complaint)[]>([]);

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

        if (result.data[i].orderID.status === 5) {
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
      // console.log("Order: ", order);
    }
  }, [OrderData, OrderIsSuccess]);

  useEffect(() => {
    if (ComplaintisSuccess) {
      let result: any = [];
      result = Complaintdata;

      const size = result.data?.length || 0;
      const complaint: Complaint[] = [];

      // console.log("size: ", size);

      for (let i = 0; i < size; i++) {
        const dateStr = result.data[i].date_added;
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${month}/${day}/${year} ${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        complaint.push({
          status: result.data[i]?.complaint === "Canceled Order" ? "1" : "2",
          id: i.toString(),
          neworderID: result.data[i]?.orderID.id || "", // Safeguard against undefined orderID
          name:
            result.data[i]?.orderID.customerID.fname +
              " " +
              result.data[i]?.orderID.customerID?.lname || "",
          assignedbranch: result.data[i]?.orderID.branch.name || "",
          amount: "N/A",
          ordertaker: result.data[i]?.added_by?.fullname || "",
          edt: formattedDate,
          cid: result.data[i]?.id || "", // Safeguard against undefined id
          type: "complaint",
        });
      }
      setComplaint(complaint);
      // console.log("Complaint: ", complaint);
    }
  }, [Complaintdata, ComplaintisSuccess]);

  useEffect(() => {
    const combinedData = [...order, ...complaint];

    const sortedCombined = combinedData.sort((b, a) => {
      const dateA = new Date(a.edt);
      const dateB = new Date(b.edt);
      return dateA.getTime() - dateB.getTime();
    });

    setCombined(sortedCombined);

    // console.log("Combined: ", combined);
  }, [order, complaint]);

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
          <ShowOrderDetails
            cust_id={params.row.cid}
            orderID={params.row.neworderID}
            name={params.value}
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

  const filteredContent = combined.filter(
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

export default Table_Inquiries_History;