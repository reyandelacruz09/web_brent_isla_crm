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
import { useAddInventoryMutation, useGetRolesQuery } from "../../store";
import { Slide, toast } from "react-toastify";
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "600px",
    maxWidth: "100%",
  },
}));

interface InventoryDetails_LProps {
  pid: number;
}

export default function Add_Quantity_Modal({ pid }: InventoryDetails_LProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addQuantity, setAddQuantity] = useState({
    product: 0,
    quantity: "",
    price: "",
    issuedby: "",
    type: 1,
  });

  const account_detailed = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  useEffect(() => {
    setAddQuantity((prevState) => ({
      ...prevState,
      product: pid,
      issuedby: account_detailed.id,
      quantity: "",
    }));
  }, [pid]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setAddQuantity({
      ...addQuantity,
      [name]: value,
    });
  };

  const [addInventory] = useAddInventoryMutation();

  const saveInventory = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await addInventory(addQuantity).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Added!", {
          transition: Slide,
        });
        handleClose();
      } else {
        alert("something wrong");
      }
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  return (
    <React.Fragment>
      <div className="pb-5 pt-2 flex justify-end">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          //disabled={!pid}
          disabled={
            getRolesAPI.data?.data.inventory.create === true && pid
              ? false
              : true
          }
        >
          Add Quantity
        </Button>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Quantity
        </DialogTitle>
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
        <DialogContent dividers className="flex justify-center">
          <div className="flex gap-5">
            <div className="flex w-full">
              <div className="grid place-items-center pr-5">
                <Typography>Quantity: </Typography>
              </div>
              <div className="w-3/4">
                <input
                  type="number"
                  id="quantity"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-right"
                  autoComplete="off"
                  onChange={handleInput}
                  name="quantity"
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="grid place-items-center pr-5">
                <Typography>Price: </Typography>
              </div>
              <div className="w-3/4 relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">PHP</span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-right"
                  autoComplete="off"
                  onChange={handleInput}
                  name="price"
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex">
            <div className="flex justify-start w-1/2">
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ width: "150px" }}
              >
                Cancel
              </Button>
            </div>
            <div className="flex justify-end w-1/2">
              <Button
                onClick={saveInventory}
                variant="contained"
                color="success"
                sx={{ width: "150px" }}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
