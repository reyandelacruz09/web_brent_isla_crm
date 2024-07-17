import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import EditOutlined from "@mui/icons-material/EditOutlined";
import ProductInformation from "./ProductInformation";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useViewProductQuery } from "../../store";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  unitPrice: string;
  active: string;
  edit: string;
}

interface ModalUpdateProductProps {
  modalid: string;
}

const Modal_Update_Product: React.FC<ModalUpdateProductProps> = ({
  modalid,
}) => {
  const [open, setOpen] = React.useState(false);
  const [pcode, setPcode] = React.useState("");
  const [pname, setPname] = React.useState("");
  const [powner, setPowner] = React.useState("");
  const [pprice, setPprice] = React.useState("");
  const [pdescription, setPdescription] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //const selectedProduct = useViewProductQuery(modalid);
  const { data, error, isLoading, isSuccess } = useViewProductQuery(modalid);

  let result: any = [];
  result = data;

  React.useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = data;

      setPcode(result.data.code);
      setPname(result.data.name);
      setPowner(result.data.owner);
      setPprice(result.data.price);
      setPdescription(result.data.description);
      console.log(result.data.code);
    }
  }, [data, isSuccess]);

  // let product;
  // let schedule;
  // if (selectedProduct.isLoading) {
  //   return <div>Loading....</div>;
  // } else if (selectedProduct.error) {
  //   return <div>Refresh the page...</div>;
  // } else {
  //   product = selectedProduct.data;
  //   let result: any = [];
  //   result = selectedProduct;

  //   // schedule = selectedProduct.data;
  //   //console.log(selectedProduct.data?.name);
  // }

  return (
    <React.Fragment>
      <EditOutlined onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-1/3">
              <p>ID: {modalid}</p>
            </div>
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
                  <span className="">Edit</span>
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  className="w-36 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save and Close</span>
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
          {/* <hr className="mt-3" /> */}
          <div className="grid grid-cols-3">
            <div className="col-span-3">
              <span className="text-lg font-bold">
                <KeyboardAltOutlinedIcon className="align-top" /> Product
                Information
              </span>
            </div>

            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Code
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={pcode}
                  disabled
                />
              </div>
            </div>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-24"
                  placeholder=""
                  value={pname}
                />
                <FormControlLabel
                  className="absolute top-0 right-0"
                  control={<Checkbox defaultChecked />}
                  label="Active"
                />
              </div>
            </div>
            <div className="pt-5 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Owner
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={powner}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Unit Price
              </label>
              <div className="relative mb-6">
                <input
                  type="number"
                  id="input-group-1"
                  className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={pprice}
                />
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Description
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={pdescription}
                />
              </div>
            </div>

            <div className=" mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Bar Code
              </label>
              <div className="relative mb-6"></div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Modal_Update_Product;
