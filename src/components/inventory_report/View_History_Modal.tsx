import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useInventoryHistoryQuery, useGetRolesQuery } from "../../store";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Inventory } from "@mui/icons-material";
import DataGridToolBar from "../custom/DataGridToolBar";
import Date_Format from "../order/Date_Format";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "60vw",
    height: "85vh",
    maxWidth: "none",
    maxHeight: "none",
  },
}));

interface InventoryDetails_LProps {
  pid: number;
}

interface InventoryItem {
  id: number;
  code: string;
  name: string;
  qty: string;
  price: string;
  type: string;
  date: Date;
}

export default function View_History_Modal({ pid }: InventoryDetails_LProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<InventoryItem[]>([]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const getInventHist = useInventoryHistoryQuery({
    productID: pid || 0,
  });

  useEffect(() => {
    if (getInventHist.isSuccess) {
      // console.log("Fetched Inventory History Data:", getInventHist.data);

      // Adjust this based on the actual data structure
      //   const data = Array.isArray(getInventHist.data) ? getInventHist.data : [];
      let result: any = getInventHist.data;
      const history: InventoryItem[] = [];

      const size = Object.keys(result.data).length;
      for (let i = 0; i < size; i++) {
        history.push({
          id: i + 1,
          code: result.data[i].product.code,
          name: result.data[i].product.name,
          qty: result.data[i].quantity,
          price: result.data[i].price,
          type: result.data[i].type,
          date: result.data[i].date_added,
        });
      }
      setProductCode(result.data[0]?.product.code);
      setProductName(result.data[0]?.product.name);

      setContent(history);
    }
  }, [getInventHist.data]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 50 },
    { field: "code", headerName: "Code", width: 130 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "qty", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "date", headerName: "Date", width: 130 },
  ];

  const renderCell = (params: any) => {
    if (params.colDef.field === "price") {
      return (
        <div style={{ textAlign: "right", paddingRight: "1rem" }}>
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(parseFloat(params.value || "0"))}
        </div>
      );
    } else if (params.colDef.field === "type") {
      return (
        <div style={{ textAlign: "center" }}>
          {params.value === 1 ? "Receipt" : "Released"}
        </div>
      );
    } else if (params.colDef.field === "qty") {
      return <div style={{ textAlign: "center" }}>{params.value}</div>;
    } else if (params.colDef.field === "date") {
      return (
        <div style={{ textAlign: "center" }}>
          <Date_Format date_formatted={params.value} />
        </div>
      );
    }
    return params.value;
  };

  return (
    <React.Fragment>
      <div className="pb-5 pt-2 flex justify-start">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          disabled={
            getRolesAPI.data?.data.inventory.create === true && pid
              ? false
              : true
          }
        >
          View History
        </Button>
      </div>
      <BootstrapDialog open={open} onClose={handleClose}>
        <DialogTitle>
          {productCode} - {productName}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
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
              width: "100%",
            }}
            rowHeight={35}
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
            rowSelection={false}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            hideFooterSelectedRowCount
            slots={{ toolbar: DataGridToolBar }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
