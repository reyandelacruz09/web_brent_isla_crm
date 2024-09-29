import React from "react";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

function PrintRTInvoice() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <PrintIcon className="text-blue-700" onClick={handleClickOpen} />

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <div className="flex">
              <div className="w-1/3">Print Invoice</div>
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
              <img
                src="../../images/sample_invoice.jpg"
                alt="Sample Invoice"
                className="h-full"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleClose}>
              Print
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
}

export default PrintRTInvoice;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
