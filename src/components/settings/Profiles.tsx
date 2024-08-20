import React from "react";
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
import { styled } from "@mui/material";

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

function Profiles() {
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
  return (
    <>
      <NavBar />
      <div className="pt-10 pb-5 flex justify-center">
        <div className="w-2/3 flex items-center">
          <div className="flex-shrink-0">
            <Link to="/settings">
              <span className="bg-gray-300 p-2 rounded-lg">
                <ArrowBackOutlinedIcon className="cursor-pointer" />
              </span>
            </Link>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-shrink-0">
            <Modal_Create_Profile />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width="20%">Profile Name</StyledTableCell>
                  <StyledTableCell align="center" width="50%">
                    Description
                  </StyledTableCell>
                  <StyledTableCell align="center" width="15%">
                    Date Created
                  </StyledTableCell>
                  <StyledTableCell align="center" width="15%">
                    Created by
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Profiles;
