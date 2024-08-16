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
import {
  useViewProductQuery,
  useUpdateProductMutation,
  useBranchListQuery,
  useCategoryListQuery,
} from "../../store";

import { useEffect, useState } from "react";
import { Client, PCategory } from "./AddProduct";
import { Slide, toast } from "react-toastify";

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
  discount: string;
}

interface ModalUpdateProductProps {
  modalid: string;
}

const Modal_Update_Product: React.FC<ModalUpdateProductProps> = ({
  modalid,
}) => {
  const [open, setOpen] = React.useState(false);

  const [updateProduct, setUpdateProduct] = React.useState({
    id: "",
    client: "",
    owner: "",
    category: "",
    code: "",
    name: "",
    active: "",
    price: "",
    discount: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { data, error, isLoading, isSuccess } = useViewProductQuery(modalid);
  const [upProduct] = useUpdateProductMutation();

  const [condition, setCondition] = useState(true);

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
        owner: result.data.branch.id || "",
        category: result.data.category || "",
        code: result.data.code || "",
        name: result.data.name || "",
        active: result.data.status || "",
        price: result.data.price || "",
        discount: result.data.discount || 0,
        description: result.data.description || "",
      });

      if (result.data.status === 2) {
        setCondition(false);
      }
    }
    //console.warn(data);
  }, [data, isSuccess]);

  const saveProduct = async (e: any) => {
    e.preventDefault();

    console.log(updateProduct);

    try {
      const checkstat = await upProduct(updateProduct).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Updated!", {
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

  const clients = useBranchListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const productcategory = useCategoryListQuery("");
  const [listCategory, setListCategory] = useState<PCategory[]>([]);
  useEffect(() => {
    if (productcategory.isSuccess) {
      const category_result =
        ((productcategory.data as any).data as PCategory[]) || [];
      setListCategory(category_result);
    }
  }, [productcategory.isSuccess, productcategory.data]);

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
                    onClick={handleClose}
                  >
                    <span className="">Cancel</span>
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
                        defaultChecked={condition}
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
                  <select
                    name="owner"
                    value={updateProduct.owner || ""}
                    onChange={handleInput}
                    id="rec_mode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  >
                    <option value="" disabled>
                      Choose One
                    </option>
                    {content.map((listOption: any) => (
                      <option key={listOption.id} value={listOption.id}>
                        {listOption.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Category
                </label>
                <div className="relative mb-6 ">
                  <select
                    name="category"
                    value={updateProduct.category || ""}
                    onChange={handleInput}
                    id="rec_mode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  >
                    <option value="" disabled>
                      Choose One
                    </option>
                    {listCategory.map((listcate: any) => (
                      <option key={listcate.id} value={listcate.id}>
                        {listcate.name}
                      </option>
                    ))}
                  </select>
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

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Discount
                </label>
                <div className="relative mb-6">
                  <input
                    type="number"
                    id="input-group-1"
                    className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    name="discount"
                    value={updateProduct.discount}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className=" mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Description
                </label>
                <div className="relative mb-6">
                  <textarea
                    id="input-group-1"
                    name="description"
                    value={updateProduct.description}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
                  ></textarea>
                </div>
              </div>

              {/* <div className=" mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Bar Code
                </label>
                <div className="relative mb-6"></div>
              </div> */}
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
