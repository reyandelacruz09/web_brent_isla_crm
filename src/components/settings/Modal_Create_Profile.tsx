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

import "react-datepicker/dist/react-datepicker.css";
import { Slide, toast } from "react-toastify";
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "40%", // Adjust width percentage as needed
    maxWidth: "800px", // Set a maxWidth if you want a limit
    height: "70%", // Adjust height percentage as needed
    maxHeight: "600px", // Set a maxHeight if you want a limit
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Modal_Create_Profile() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const account_detailed1 = JSON.parse(
    localStorage.getItem("user_info") || "{}"
  );

  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={handleClickOpen}
      >
        Create Profile
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-1/3">Create New Profile</div>
            <div className="w-2/3 flex justify-end pr-10">
              <div className="flex gap-3"></div>
            </div>
          </div>
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
        <DialogContent dividers>
          <div>
            <Typography className="pt-4 pb-2">Profile Name:</Typography>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <Typography className="pt-4 pb-2">Clone Profile:</Typography>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <Typography className="pt-4 pb-2">Profile Description:</Typography>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <hr className="mt-3" /> */}
        </DialogContent>
        <DialogActions>
          <Button
            component="label"
            variant="contained"
            className="w-32 pt-2"
            tabIndex={-1}
            size="small"
            color="error"
            onClick={handleClose}
          >
            <span className="">Cancel</span>
          </Button>
          <Button
            component="label"
            variant="contained"
            className="w-32 pt-2"
            tabIndex={-1}
            size="small"
            color="primary"
          >
            <span className="">Create</span>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
