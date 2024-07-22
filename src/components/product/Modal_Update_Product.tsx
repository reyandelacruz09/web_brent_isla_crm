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
import { useViewProductQuery, useUpdateProductMutation } from "../../store";

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
  active: boolean;
  edit: string;
}

interface ModalUpdateProductProps {
  modalid: string;
}

const Modal_Update_Product: React.FC<ModalUpdateProductProps> = ({
  modalid,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [pcode, setPcode] = React.useState("");
  // const [pname, setPname] = React.useState("");
  // const [powner, setPowner] = React.useState("");
  // const [pprice, setPprice] = React.useState("");
  // const [pdescription, setPdescription] = React.useState("");

  const [updateProduct, setUpdateProduct] = React.useState({
    id: "",
    client: "",
    owner: "",
    category: "",
    code: "",
    name: "",
    active: true,
    price: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: type === "checkbox" ? checked : value,
    });
    // setUpdateProduct((prevProduct) => ({
    //   ...prevProduct,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
  };

  //const selectedProduct = useViewProductQuery(modalid);
  const { data, error, isLoading, isSuccess } = useViewProductQuery(modalid);
  const [upProduct] = useUpdateProductMutation();

  let result: any = [];
  result = data;

  React.useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = data;

      setUpdateProduct({
        id: result.data.id || "",
        client: result.data.client || "",
        owner: result.data.owner || "",
        category: result.data.category || "",
        code: result.data.code || "",
        name: result.data.name || "",
        active: result.data.active || true,
        price: result.data.price || "",
        description: result.data.description || "",
      });
    }
  }, [data, isSuccess]);

  const saveProduct = async (e: any) => {
    e.preventDefault();

    console.log(updateProduct);

    try {
      const checkstat = await upProduct(updateProduct).unwrap();
      if (checkstat.success === true) {
        alert("success");
        //window.location.reload();
      } else {
        alert("something wrong");
      }
    } catch (error) {
      alert("Hala");
    }
  };

  return (
    <form>
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
                    onClick={saveProduct}
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
                    name="code"
                    value={updateProduct.code}
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
                    name="name"
                    value={updateProduct.name}
                    onChange={handleInput}
                  />
                  <FormControlLabel
                    className="absolute top-0 right-0"
                    control={
                      <Checkbox
                        onChange={handleInput}
                        checked={updateProduct.active === true}
                        name="active"
                      />
                    }
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
                    name="owner"
                    value={updateProduct.owner}
                    onChange={handleInput}
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
                    name="price"
                    value={updateProduct.price}
                    onChange={handleInput}
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
                    name="description"
                    value={updateProduct.description}
                    onChange={handleInput}
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
            <Button autoFocus onClick={saveProduct}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </form>
  );
};

export default Modal_Update_Product;
