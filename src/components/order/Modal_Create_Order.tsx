import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AddIcon from "@mui/icons-material/Add";
import CustomerInformation from "./CustomerInformation";
import ProductOrder from "./ProductOrder";
import Others from "./Others";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create New Order
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
            <div className="w-1/3">Create Order</div>
            <div className="w-2/3 flex justify-end pr-10">
              <div className="flex gap-3">
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save & Close</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save & New</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-36 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Locate Address</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Print Preview</span>
                </Button>
              </div>
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
          <div className="grid grid-cols-5">
            <div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span className="text-md font-bold text-slate-900">
                    Demographic
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="border-2 border-blue-500 rounded-md px-2 mt-1"
                  defaultValue="residential"
                >
                  <FormControlLabel
                    value="residential"
                    control={<Radio />}
                    label={<span className="text-sm">Residential</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="business"
                    control={<Radio />}
                    label={<span className="text-sm">Business</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span className="text-md font-bold text-slate-900">
                    Order Type
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="border-2 border-blue-500 rounded-md px-2 mt-1"
                  defaultValue="callType"
                >
                  <FormControlLabel
                    value="callType"
                    control={<Radio />}
                    label={<span className="text-sm">Call Type</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="complaint"
                    control={<Radio />}
                    label={<span className="text-sm">Complaint</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="">
              <FormControl className="w-full">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span className="text-md font-bold text-slate-900">
                    Call Type
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
                >
                  <Select
                    variant="standard"
                    className="mt-0 w-full border-none"
                  >
                    <MenuItem value="Order">
                      <span className="text-sm">Call</span>
                    </MenuItem>
                  </Select>
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl className="w-full">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span className="text-md font-bold text-slate-900">
                    Type of Complaint
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
                >
                  <Select variant="standard" className="mt-0 w-full">
                    <MenuItem value="Order">
                      <span className="text-sm">Cancelled Order</span>
                    </MenuItem>
                  </Select>
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl className="w-full">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span className="text-md font-bold text-slate-900">
                    Reason of Cancel
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="border-2 border-blue-500 rounded-md px-2 mt-1 mr-5"
                >
                  <Select variant="standard" className="mt-0 w-full">
                    <MenuItem value="Order">
                      <span className="text-sm">Late Delivery</span>
                    </MenuItem>
                  </Select>
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <hr className="mt-3" />
          <CustomerInformation />

          <hr className="mt-3" />
          <ProductOrder />

          <hr className="mt-3" />
          <Others />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
