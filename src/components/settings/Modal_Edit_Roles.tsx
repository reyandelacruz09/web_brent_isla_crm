import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Slide, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Button, Checkbox, styled, Switch, Typography } from "@mui/material";
import { useEditRolesQuery, useUpdateRoleMutation } from "../../store";
import { log } from "console";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%", // Adjust width percentage as needed
    maxWidth: "800px", // Set a maxWidth if you want a limit
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.primary.main, // Maintain the color when disabled
  },
}));

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.primary.main, // Color when disabled
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.primary.main, // Thumb color when disabled
    },
    "& .MuiSwitch-track": {
      backgroundColor: theme.palette.action.disabled, // Track color when disabled
    },
  },
}));

interface name {
  name: string;
  id: string;
}

interface choices {
  id: number;
  access: boolean;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface roles {
  id: number;
  name: string;
  access: boolean;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export default function Modal_Edit_Roles({ name, id }: name) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [roleList, setRoleList] = useState<roles[]>([]);

  const [btnsave, setbtnsave] = useState(true);
  const [btnedit, setbtnedit] = useState(false);

  const [allDisabled, setAllDisabled] = useState(true);

  const account_detailed = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const { data: roles, isSuccess: isRolesSuccess } = useEditRolesQuery({
    client: account_detailed.department.id,
    role: id,
  });

  useEffect(() => {
    if (isRolesSuccess && roles) {
      setRoleList(roles.data);
    }
  }, [isRolesSuccess, roles]);
  // console.warn(roleList);

  const handleEdit = () => {
    setbtnsave(false);
    setbtnedit(true);
    setAllDisabled(false);
  };

  const handleSwitchChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setRoleList((prevList) =>
        prevList.map((role, i) =>
          i === index
            ? {
                ...role,
                access: checked,
                view: checked ? role.view : false,
                create: checked ? role.create : false,
                edit: checked ? role.edit : false,
                delete: checked ? role.delete : false,
              }
            : role
        )
      );
    };

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setRoleList((prevList) =>
        prevList.map((role, i) =>
          i === index ? { ...role, [name]: checked } : role
        )
      );
    };

  const [updateRole] = useUpdateRoleMutation();

  const upRole = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await updateRole(roleList).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Updated!", {
          transition: Slide,
        });
        setbtnsave(true);
        setbtnedit(false);
        setAllDisabled(true);
        // handleClose();
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
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      {/* </span> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-1/3">Edit Role ({name})</div>
            <div className="w-2/3 flex justify-end pr-5">
              <div className="flex gap-3">
                <Button
                  variant="contained"
                  className=""
                  onClick={handleEdit}
                  disabled={btnedit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  className=""
                  onClick={upRole}
                  disabled={btnsave}
                >
                  Save
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
          <div className="flex justify-center">
            <div className="w-full">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell width="25%">Module</StyledTableCell>
                      <StyledTableCell align="center" width="15%">
                        Access Permission
                      </StyledTableCell>
                      <StyledTableCell align="center" width="15%">
                        View
                      </StyledTableCell>
                      <StyledTableCell align="center" width="15%">
                        Created
                      </StyledTableCell>
                      <StyledTableCell align="center" width="15%">
                        Edit
                      </StyledTableCell>
                      <StyledTableCell align="center" width="15%">
                        Delete
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roleList.map((roles, index) => {
                      console.log(roles.access);
                      return (
                        <>
                          <StyledTableRow key={index}>
                            <TableCell component="th" scope="row">
                              {roles.name}
                            </TableCell>
                            <TableCell align="center">
                              <CustomSwitch
                                size="small"
                                checked={roles.access}
                                disabled={allDisabled}
                                name="access"
                                onChange={handleSwitchChange(index)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <CustomCheckbox
                                checked={roles.view}
                                disabled={allDisabled}
                                name="view"
                                onChange={handleCheckboxChange(index)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <CustomCheckbox
                                checked={roles.create}
                                disabled={allDisabled}
                                name="create"
                                onChange={handleCheckboxChange(index)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <CustomCheckbox
                                checked={roles.edit}
                                disabled={allDisabled}
                                name="edit"
                                onChange={handleCheckboxChange(index)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <CustomCheckbox
                                checked={roles.delete}
                                disabled={allDisabled}
                                name="delete"
                                onChange={handleCheckboxChange(index)}
                              />
                            </TableCell>
                          </StyledTableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
