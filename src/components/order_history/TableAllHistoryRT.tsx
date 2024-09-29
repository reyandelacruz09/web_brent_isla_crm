//import * as React from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, ThemeProvider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useOrderListHistoryQuery, useViewComplaintsQuery } from "../../store";
import { useEffect, useState } from "react";
import Show_Order_Details from "./ShowOrderDetails";
import PrintIcon from "@mui/icons-material/Print";
import PrintRTInvoice from "./PrintRTInvoice";

export interface OrderRT {
  status: string;
  orderID: string;
  id: string;
  custcode: string;
  custname: string;
  truck: string;
  tripno: string;
  date: string;
  refno: string;
  //   orderqty: string;
  //   cyltype: string;
  //   wwight: string;
  remarks: string;
  print: string;
  edt: string;
  cid: string;
}

export interface ComplaintRT {
  status: string;
  orderID: string;
  id: string;
  custcode: string;
  custname: string;
  truck: string;
  tripno: string;
  date: string;
  refno: string;
  //   orderqty: string;
  //   cyltype: string;
  //   wwight: string;
  remarks: string;
  print: string;
  edt: string;
  cid: string;
}
// interface Complaint {
//   status: string;
//   neworderID: string;
//   id: string;
//   custname: string;
//   name: string;
//   assignedbranch: string;
//   amount: string;
//   ordertaker: string;
//   edt: string;
//   cid: string;
//   type: string;
// }

export interface Table_All_History_Props {
  search: string;
  owner: string;
  rt_type: string;
}

const columns: GridColDef[] = [
  {
    field: "orderID",
    headerName: "ID",
    width: 100,
    align: "center",
  },
  {
    field: "custcode",
    headerName: "Code",
    width: 100,
    align: "center",
  },
  { field: "custname", headerName: "Name", width: 150 },
  { field: "truck", headerName: "Truck", width: 120 },
  { field: "tripno", headerName: "Trip No", width: 120 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "refno", headerName: "Ref No", width: 100 },
  //   { field: "orderqty", headerName: "Order Quantity", width: 80 },
  //   { field: "cyltype", headerName: "CYL Type", width: 100 },
  //   { field: "weight", headerName: "Weight/Accum", width: 100 },
  { field: "remarks", headerName: "Remarks", width: 280 },
  { field: "print", headerName: "Print", width: 100 },
];

function TableAllHistoryRT({
  search,
  owner,
  rt_type,
}: Table_All_History_Props) {
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
    rt_type: rt_type,
  });
  const {
    data: Complaintdata,
    isSuccess: ComplaintisSuccess,
    isLoading: ComplaintisLoading,
  } = useViewComplaintsQuery({
    owner: bowner,
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
  const [order, setOrder] = useState<OrderRT[]>([]);
  const [complaint, setComplaint] = useState<ComplaintRT[]>([]);
  const [combined, setCombined] = useState<(OrderRT | ComplaintRT)[]>([]);

  useEffect(() => {
    if (OrderIsSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      result = OrderData.results;

      const size = Object.keys(result).length;
      const order: OrderRT[] = [];

      for (let i = 0; i < size; i++) {
        const dateStr = result[i].orderID.expected_deltime;
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${month}/${day}/${year} ${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        let newid = i + 100000000000;
        order.push({
          orderID: result[i].orderID.orderID,
          status: result[i].orderID.status,
          // neworderID: result[i].orderID.orderID,
          id: newid.toString(),
          custcode: result[i].orderID.customerID.customercode,
          custname: result[i].orderID.customerID.customername,
          truck: result[i].orderID.truck,
          tripno: result[i].orderID.tripno,
          date: formattedDate,
          refno: result[i].orderID.invoiceno,
          remarks: "",
          print: "",
          edt: formattedDate,
          cid: result[i].orderID.customerID.id,
        });
      }
      setOrder(order);
      setTotalOrder(OrderData.count);
      console.log("Order: ", order);
    }
  }, [OrderData, OrderIsSuccess]);

  useEffect(() => {
    if (ComplaintisSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      result = Complaintdata.results;

      const size = result?.length || 0;
      const complaint: ComplaintRT[] = [];

      // console.log("size: ", size);

      for (let i = 0; i < size; i++) {
        const orderID = result[i]?.orderID;
        const dateStr = result[i].date_added;
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
          orderID: result[i].orderID.orderID,
          status: result[i].orderID.status,
          // neworderID: result[i].orderID.orderID,
          id: i.toString(),
          custcode: result[i].orderID.customerID.customercode,
          custname: result[i].orderID.customerID.customername,
          truck: result[i].orderID.truck,
          tripno: result[i].orderID.tripno,
          date: "",
          refno: result[i].orderID.invoiceno,
          remarks: "",
          print: "",
          edt: formattedDate,
          cid: result[i].orderID.customerID.id,
        });
      }
      setComplaint(complaint);
      setTotalComplaint(Complaintdata.count);
      console.log("Complaint: ", result);
    }
  }, [Complaintdata, ComplaintisSuccess]);

  useEffect(() => {
    const combinedData = [...order, ...complaint];

    const sortedCombined = combinedData.sort((b, a) => {
      const dateA = new Date(a.edt);
      const dateB = new Date(b.edt);
      return dateA.getTime() - dateB.getTime();
    });
    setTotalCount(totalOrder + totalComplaint);
    setCombined(sortedCombined);

    console.log("Combined: ", combined);
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
          {/* {params.value} */}
          <Show_Order_Details
            cust_id={params.row.cid}
            orderID={params.row.neworderID}
            name={params.value === " " ? params.row.custname : params.value}
            type={params.row.type}
          />
          {/* {params.row.cid} */}
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
    } else if (params.colDef.field === "print") {
      return (
        <div className="text-right pr-5">
          <span className="cursor-pointer">
            {/* <PrintIcon className="text-blue-700" /> */}
            <PrintRTInvoice />
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
      order.custcode.toLowerCase().includes(search.toLowerCase()) ||
      order.custname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full h-full bg-white">
        {OrderIsLoading && ComplaintisLoading ? (
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

export default TableAllHistoryRT;
