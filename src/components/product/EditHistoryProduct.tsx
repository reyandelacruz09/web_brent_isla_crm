import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useViewProductHistoryQuery } from "../../store";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Date_Format from "../order/Date_Format";
import DataGridToolBar from "../custom/DataGridToolBar";

interface pid {
  pid: string;
}

interface Product {
  date: string;
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  price: string;
  status: string;
  delete: string;
  modified: string;
}

function EditHistoryProduct({ pid }: pid) {
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState<Product[]>([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 130 },
    { field: "code", headerName: "Product Code", width: 100 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "description", headerName: "Product Description", width: 200 },
    { field: "owner", headerName: "Branch Owner", width: 130 },
    { field: "price", headerName: "Unit Price", width: 150 },
    { field: "status", headerName: "Active", width: 130 },
    { field: "delete", headerName: "Deleted", width: 130 },
    { field: "modified", headerName: "Modified by", width: 130 },
  ];

  const renderCell = (params: any) => {
    if (params.colDef.field === "date") {
      return (
        <span className="flex justify-center items-center">
          <Date_Format date_formatted={params.value} />
        </span>
      );
    }
    return params.value;
  };

  const phistory = useViewProductHistoryQuery({
    productID: pid,
  });

  useEffect(() => {
    if (phistory.isSuccess && phistory.data) {
      let result: any = [];
      let content: any = [];
      result = phistory.data?.data;

      const size = Object.keys(result).length;
      const products: Product[] = [];

      for (let i = 0; i < size; i++) {
        let branchName = result[i].branch.name;
        products.push({
          date: result[i].date_added,
          id: result[i].id,
          code: result[i].code,
          name: result[i].name,
          description: result[i].description,
          owner: branchName,
          price: result[i].price.toFixed(2),
          status: result[i].status,
          delete: result[i].deleted,
          modified: result[i].modified?.fullname,
        });
      }

      setContent(products);
      console.log("Result Here: ", result);
    }
  }, [phistory.data, phistory.isSuccess]);
  return (
    <>
      <Button
        component="label"
        variant="contained"
        className="pt-2"
        tabIndex={-1}
        size="small"
        color="warning"
        onClick={handleOpenModal}
      >
        <span className="">View Edit History</span>
      </Button>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "80vw",
            height: "85vh",
            maxWidth: "none",
            maxHeight: "none",
          },
        }}
      >
        <DialogTitle>Product {pid}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <FormControl fullWidth>
            <div className="flex justify-center">
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
                  width: "55vw",
                  maxWidth: "none",
                  height: "65vh",
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
                pageSizeOptions={[5, 10, 20, 50, 100]}
                hideFooterSelectedRowCount
                slots={{ toolbar: DataGridToolBar }}
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full pb-3">
            <div className="w-full flex justify-end">
              <Button
                variant="contained"
                color="info"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditHistoryProduct;
