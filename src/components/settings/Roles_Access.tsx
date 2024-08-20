import React, { useState } from "react";
import NavBar from "../NavBar";
import Modal_Create_Profile from "./Modal_Create_Profile";
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

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData(
    "Administrator",
    "This profile will have all the permissions. Users with Administrator profile will be able to view and manage all the data within the organization account by default.",
    "Dec 25, 2023",
    "Orlhie S Almendares"
  ),
  createData(
    "Standard",
    "This profile will have all the permissions except administrative privileges.",
    "Dec 25, 2023",
    "Orlhie S Almendares"
  ),
  createData(
    "Agents",
    "Burger Machine Branch",
    "Dec 25, 2023",
    "Orlhie S Almendares"
  ),
];

const modules = [
  "Dashboard",
  "Order",
  "Products",
  "Branch",
  "Order History",
  "Inventory",
  "User",
  "Department",
  "KB",
];

function Roles_Access() {
  const [btnsave, setbtnsave] = useState({
    admin: true,
    manager: true,
    agent: true,
  });
  const [btnedit, setbtnedit] = useState({
    admin: false,
    manager: false,
    agent: false,
  });
  const [fields, setFields] = useState({
    adm_access: true,
    adm_view: true,
    adm_create: true,
    adm_edit: true,
    adm_delete: true,
    mng_access: true,
    mng_view: true,
    mng_create: true,
    mng_edit: true,
    mng_delete: true,
    agt_access: true,
    agt_view: true,
    agt_create: true,
    agt_edit: true,
    agt_delete: true,
  });

  const handleAdminEdit = () => {
    setbtnsave((prevState) => ({
      ...prevState,
      admin: false,
    }));
    setbtnedit((prevState) => ({
      ...prevState,
      admin: true,
    }));
    setFields((prevState) => ({
      ...prevState,
      adm_access: false,
      adm_view: false,
      adm_create: false,
      adm_edit: false,
      adm_delete: false,
    }));
  };
  const handleAdminSave = () => {
    setbtnsave((prevState) => ({
      ...prevState,
      admin: true,
    }));
    setbtnedit((prevState) => ({
      ...prevState,
      admin: false,
    }));
    setFields((prevState) => ({
      ...prevState,
      adm_access: true,
      adm_view: true,
      adm_create: true,
      adm_edit: true,
      adm_delete: true,
    }));
  };

  return (
    <>
      <NavBar />
      <div className="pt-5 flex justify-center">
        <div className="w-3/4">
          <Link to="/settings">
            <span className="bg-gray-300 p-2 rounded-lg">
              <ArrowBackOutlinedIcon className="cursor-pointer" />
            </span>
          </Link>
        </div>
      </div>
      <div className="pt-10 pb-5 flex justify-center ">
        <div className="w-2/3 flex items-center">
          <div className="flex-shrink-0">
            <Typography variant="h6" component="div" className="py-1 px-2">
              Administrator
            </Typography>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-shrink-0">
            <Button
              variant="contained"
              className=""
              onClick={handleAdminEdit}
              disabled={btnedit.admin}
            >
              Edit
            </Button>
            &emsp;
            <Button
              variant="contained"
              className=""
              onClick={handleAdminSave}
              disabled={btnsave.admin}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
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
                {modules.map((listModules) => (
                  <StyledTableRow>
                    <TableCell component="th" scope="row">
                      {listModules}
                    </TableCell>
                    <TableCell align="center">
                      <CustomSwitch
                        size="small"
                        defaultChecked={true}
                        disabled={fields.adm_access}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox
                        defaultChecked={true}
                        disabled={fields.adm_view}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox
                        defaultChecked={true}
                        disabled={fields.adm_create}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox
                        defaultChecked={true}
                        disabled={fields.adm_edit}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox
                        defaultChecked={true}
                        disabled={fields.adm_delete}
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 pt-5">
          <hr className="border-2 border-gray-300" />
        </div>
      </div>

      <div className="pt-10 pb-5 flex justify-center ">
        <div className="w-2/3 flex items-center">
          <div className="flex-shrink-0">
            <Typography variant="h6" component="div" className="py-1 px-2">
              Manager
            </Typography>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-shrink-0">
            <Button variant="contained" className="">
              Edit
            </Button>
            &emsp;
            <Button variant="contained" className="">
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
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
                {modules.map((listModules) => (
                  <StyledTableRow>
                    <TableCell component="th" scope="row">
                      {listModules}
                    </TableCell>
                    <TableCell align="center">
                      <CustomSwitch
                        size="small"
                        defaultChecked={true}
                        disabled={true}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 pt-5">
          <hr className="border-2 border-gray-300" />
        </div>
      </div>

      <div className="pt-10 pb-5 flex justify-center ">
        <div className="w-2/3 flex items-center">
          <div className="flex-shrink-0">
            <Typography variant="h6" component="div" className="py-1 px-2">
              Agent
            </Typography>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-shrink-0">
            <Button variant="contained" className="">
              Edit
            </Button>
            &emsp;
            <Button variant="contained" className="">
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
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
                {modules.map((listModules) => (
                  <StyledTableRow>
                    <TableCell component="th" scope="row">
                      {listModules}
                    </TableCell>
                    <TableCell align="center">
                      <CustomSwitch
                        size="small"
                        defaultChecked={true}
                        disabled={true}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                    <TableCell align="center">
                      <CustomCheckbox defaultChecked={true} disabled={true} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 pt-5">
          <hr className="border-2 border-gray-300" />
        </div>
      </div>
    </>
  );
}

export default Roles_Access;
