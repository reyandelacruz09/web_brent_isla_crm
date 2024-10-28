import React, { useEffect, useState } from "react";
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
import { useAccountRoleListQuery } from "../../store";
import Modal_Edit_Roles from "./Modal_Edit_Roles";
import Restricted from "../../pages/Restricted";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface added_by {
  fullname: string;
}

interface roles {
  id: string;
  name: string;
  description: string;
  date_created: string;
  added_by: added_by;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

function Roles_and_Sharing() {
  const [roleList, setroleList] = useState<roles[]>([]);

  function createData(name: string, edit: string) {
    return { name, edit };
  }

  const { data: roles, isSuccess: isRolesSuccess } =
    useAccountRoleListQuery("");
  useEffect(() => {
    if (isRolesSuccess && roles) {
      setroleList(roles.data);
    }
  }, [isRolesSuccess, roles]);

  const acc_detailed = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

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
          <div className="flex-shrink-0"></div>
        </div>
      </div>
      {acc_detailed.role === 1 ? (
        <div className="flex justify-center">
          <Restricted />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-2/3">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell width="20%">Profile Name</StyledTableCell>
                    <StyledTableCell align="center" width="50%">
                      Edit
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleList.map((roles) => (
                    <StyledTableRow
                      key={roles.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {roles.name}
                      </TableCell>
                      <TableCell align="center">
                        <Modal_Edit_Roles id={roles.id} name={roles.name} />
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default Roles_and_Sharing;
