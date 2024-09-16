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
import DepartmentInformation from "./DepartmentInformation";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  useViewClientQuery,
  useClientCategoryListQuery,
  useUpdateClientMutation,
} from "../../store";
import { useEffect, useState } from "react";
import { ClientCategory } from "./AddDepartment";
import { Slide, toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ModalUpdateDepartmentProps {
  modalid: string;
}

const Modal_Update_Department: React.FC<ModalUpdateDepartmentProps> = ({
  modalid,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updateClient, setUpdateClient] = React.useState({
    id: "",
    name: "",
    status: "",
    contact_person: "",
    email: "",
    contract_term: "",
    start_date: "",
    end_date: "",
    no_license: "",
    plan_subscription: "",
    date_renewal: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUpdateClient({
      ...updateClient,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { data, error, isLoading, isSuccess } = useViewClientQuery(modalid);

  const [condition, setCondition] = useState(true);

  React.useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      setUpdateClient({
        id: result.data.id || "",
        name: result.data.name || "",
        status: result.data.status || "",
        contact_person: result.data.contact_person || "",
        email: result.data.email || "",
        contract_term: result.data.contract_term || "",
        start_date: result.data.start_date || "",
        end_date: result.data.end_date || "",
        no_license: result.data.no_license || "",
        plan_subscription: result.data.plan_subscription || "",
        date_renewal: result.data.date_renewal || "",
      });

      if (result.data.status === 2) {
        setCondition(false);
      }
    }
  }, [data, isSuccess]);

  const productcategory = useClientCategoryListQuery("");
  const [listCategory, setListCategory] = useState<ClientCategory[]>([]);
  useEffect(() => {
    if (productcategory.isSuccess) {
      const category_result =
        ((productcategory.data as any).data as ClientCategory[]) || [];
      setListCategory(category_result);
    }
  }, [productcategory.isSuccess, productcategory.data]);

  const [upClient] = useUpdateClientMutation();

  const submitdata = async (e: any) => {
    // console.warn("List", updateClient);

    try {
      const checkstat = await upClient(updateClient).unwrap();
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
            <div className="w-1/3"></div>
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
                  onClick={submitdata}
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
          <div className="grid grid-cols-3">
            <div className="col-span-3">
              <span className="text-lg font-bold">
                <KeyboardAltOutlinedIcon className="align-top" /> Department
                Information
              </span>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Department Name
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  name="name"
                  onChange={handleInput}
                  value={updateClient.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
                <FormControlLabel
                  className="absolute top-0 right-0 h-full"
                  control={
                    <Checkbox
                      onChange={handleInput}
                      defaultChecked
                      name="status"
                    />
                  }
                  label="Active"
                />
              </div>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Contact Person
              </label>
              <div className="relative mb-6">
                <input
                  name="contact_person"
                  id="rec_mode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.contact_person}
                />
              </div>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-6">
                <input
                  name="email"
                  id="rec_mode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.email}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Contract Term
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  name="contract_term"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.contract_term}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Start Date
              </label>
              <div className="relative mb-6 ">
                <input
                  type="date"
                  id="input-group-1"
                  name="start_date"
                  value={updateClient.start_date}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                End Date
              </label>
              <div className="relative mb-6">
                <input
                  type="date"
                  id="input-group-1"
                  name="end_date"
                  value={updateClient.end_date}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                No of Licenses
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  name="no_license"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.no_license}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Plan Subscription
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  name="plan_subscription"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.plan_subscription}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Date of Renewal
              </label>
              <div className="relative mb-6">
                <input
                  type="date"
                  id="input-group-1"
                  name="date_renewal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleInput}
                  value={updateClient.date_renewal}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Modal_Update_Department;
