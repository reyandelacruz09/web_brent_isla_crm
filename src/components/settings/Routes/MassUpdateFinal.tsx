import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useBranchListQuery, useUpdateCustomerMutation } from "../../../store";
import { Slide, toast } from "react-toastify";

interface Data {
  field: string;
  value: string;
}

function MassUpdateFinal({ id }: any) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [branchList, setBranchList] = useState<any[]>([]);
  const [data, setData] = useState<Data>({
    field: "branch_assignment",
    value: "",
  });
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getBranchListData = useBranchListQuery({
    owner: account_detailed1.department.id,
  });

  useEffect(() => {
    if (getBranchListData.isSuccess && getBranchListData.data) {
      setBranchList(getBranchListData.data?.data);
      // console.log("branchList", getBranchListData.data?.data);
    }
  }, [getBranchListData.isSuccess, getBranchListData.data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [updateCustomer] = useUpdateCustomerMutation();
  const saveBranch = async (e: any) => {
    e.preventDefault();

    const data1 = {
      field: data.field,
      value: data.value,
      ids: id,
    };

    // console.log("data", data1);

    if (data1.value === "") {
      toast.error("Field value is missing!", {
        transition: Slide,
      });
    } else {
      try {
        const checkstat = await updateCustomer(data1).unwrap();
        if (checkstat.success === true) {
          setData({
            field: "branch_assignment",
            value: "",
          });
          toast.success("Successfully Updated!", {
            transition: Slide,
          });
          handleClose();
        } else {
          alert("something wrong 🥺");
        }
      } catch (error) {
        toast.error("Something went wrong 🥺", {
          transition: Slide,
        });
      }
    }
  };

  return (
    <>
      <Button
        style={{ marginLeft: "20px" }}
        variant="contained"
        color="info"
        size="small"
        onClick={handleClickOpen}
      >
        Mass Update
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-full">Choose Field </div>
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
          <div className="justify-center flex gap-5">
            <div className="w-1/2">
              <Typography sx={{ fontSize: "12px", color: "blue" }}>
                Choose Field to update
              </Typography>
            </div>
            <div className="w-1/2">
              <Typography sx={{ fontSize: "12px", color: "blue" }}>
                Input Value
              </Typography>
            </div>
          </div>
          <div className="justify-center flex gap-5">
            <div className="w-1/2">
              <select
                onChange={handleInput}
                name="branch_assignment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="branch_assignment">Branch Assignment</option>
              </select>
            </div>
            <div className="w-1/2">
              <select
                onChange={handleInput}
                name="value"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose One</option>
                {branchList.map((field, idx) => (
                  <option key={idx} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="info"
            size="medium"
            onClick={saveBranch}
          >
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default MassUpdateFinal;
