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
import UserInformation from "./UserInformation";
import { Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";

import {
  useBranchListQuery,
  useClientListQuery,
  useViewUserQuery,
  useUpdateUserMutation,
} from "../../store";
import { useEffect, useState } from "react";
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

interface Client {
  id: number;
  name: string;
}
interface Department {
  id: number;
  name: string;
}

export default function Modal_Update_User({
  modalid,
}: ModalUpdateDepartmentProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const depList = useClientListQuery({
    page: 0,
    pageSize: 100,
    searchQuery: "",
  });
  const [clientList, setClientList] = useState<Department[]>([]);
  useEffect(() => {
    if (depList.isSuccess) {
      let result: any = [];
      result = depList.data.results;

      const size = Object.keys(result).length;
      const client: Client[] = [];

      for (let i = 0; i < size; i++) {
        if (result[i].id === account_detailed1.department.id) {
          client.push({
            id: result[i].id,
            name: result[i].name,
          });
          setDepatmentID(result[i].id);
        }
      }

      setClientList(client);
    }
  }, [depList.isSuccess, depList.data]);

  const [updateUser, setUpdateUser] = React.useState({
    userid: "",
    id: "",
    code: "",
    email: "",
    status: true,
    password: "",
    cpassword: "",
    fullname: "",
    phone: "",
    role: "",
    department: "",
    branch: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: type === "checkbox" ? checked : value,
    });
    // if (name === "department") {
    //   setDepatmentID(value);
    // }
  };

  const { data, error, isLoading, isSuccess } = useViewUserQuery(modalid);

  const [condition, setCondition] = useState(true);

  React.useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      let newbranch = "";

      if (result.data.branch.active === 2) {
        newbranch = "0";
      } else {
        newbranch = result.data.branch.id;
      }

      setUpdateUser({
        userid: result.data.user.id || "",
        id: result.data.id || "",
        code: result.data.code || "",
        email: result.data.user.email || "",
        status: result.data.status || "",
        password: result.data.password || "",
        cpassword: result.data.cpassword || "",
        fullname: result.data.fullname || "",
        phone: result.data.phone || "",
        role: result.data.role || "",
        department: result.data.department.id || "",
        branch: newbranch || "",
      });

      if (result.data.status === 2) {
        setCondition(false);
      }
    }
  }, [data, isSuccess]);

  const [upUser] = useUpdateUserMutation();

  const submitdata = async (e: any) => {
    try {
      const checkstat = await upUser(updateUser).unwrap();
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

  const [departmentID, setDepatmentID] = useState("3");
  const clients = useBranchListQuery({
    owner: departmentID,
    page: 0,
    pageSize: 100,
    searchQuery: "",
  });
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data.results || [];
      setContent(result);

      console.log(clients.data);
    }
  }, [clients.isSuccess, clients.data]);

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
                {/* <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Edit</span>
                </Button> */}
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
                <KeyboardAltOutlinedIcon className="align-top" /> User
                Information
              </span>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Code
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="code"
                  value={updateUser.code}
                  onChange={handleInput}
                  disabled
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Fullname
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="fullname"
                  value={updateUser.fullname}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="phone"
                  value={updateUser.phone}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email"
                  value={updateUser.email}
                  onChange={handleInput}
                />
                <FormControlLabel
                  className="absolute top-0 right-0 h-full"
                  control={
                    <Checkbox
                      name="status"
                      defaultChecked={condition}
                      onChange={handleInput}
                    />
                  }
                  label="Active"
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Password{" "}
                <span className="text-xs font-light text-blue-700">
                  *Leave blank if not going to change
                </span>
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="password"
                  value={updateUser.password}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password{" "}
                <span className="text-xs font-light text-blue-700">
                  *Leave blank if not going to change
                </span>
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="cpassword"
                  value={updateUser.cpassword}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>
              <div className="relative mb-6 ">
                <select
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="role"
                  value={updateUser.role || ""}
                  onChange={handleInput}
                >
                  <option value="0" selected disabled>
                    Choose One
                  </option>
                  <option value="1">Agent</option>
                  <option value="2">Supervisor</option>
                  <option value="3">Admin</option>
                </select>
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Department
              </label>
              <div className="relative mb-6">
                <select
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="department"
                  value={updateUser.department || ""}
                  onChange={handleInput}
                >
                  <option value="0" disabled selected>
                    Choose One
                  </option>
                  {clientList.map((ClientList: any) => (
                    <option key={ClientList.id} value={ClientList.id}>
                      {ClientList.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch
              </label>
              <div className="relative mb-6">
                <select
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="branch"
                  value={updateUser.branch || ""}
                  onChange={handleInput}
                >
                  <option value="0" disabled selected>
                    Select Department
                  </option>
                  {content.map((listOption: any) => (
                    <option key={listOption.id} value={listOption.id}>
                      {listOption.name}
                    </option>
                  ))}
                </select>
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
}
