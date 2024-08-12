import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, styled, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_User from "./Modal_Update_User";
import { useUserListQuery } from "../../store";
import { useEffect, useState } from "react";
import Modal_Delete_User from "./Modal_Delete_User";

interface User {
  id: string;
  code: string;
  fullname: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  active: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Code", width: 80 },
  { field: "fullname", headerName: "Fullname", width: 180 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "department", headerName: "Department", width: 150 },
  { field: "branch", headerName: "Branch", width: 150 },
  { field: "active", headerName: "Active", width: 100 },
  { field: "edit", headerName: "Edit", width: 100 },
  { field: "delete", headerName: "Delete", width: 100 },
];

const rows = [
  {
    id: "Brent_Gas-001",
    username: "username 1",
    login: "login 1",
    group: "Group 1",
    email: "email 1",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "Brent_Gas-002",
    username: "username 2",
    login: "login 2",
    group: "Group 2",
    email: "email 2",
    active: "N",
    edit: "",
    delete: "",
  },
  {
    id: "Brent_Gas-003",
    username: "username 3",
    login: "login 3",
    group: "Group 3",
    email: "email 3",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "Brent_Gas-004",
    username: "username 4",
    login: "login 4",
    group: "Group 4",
    email: "email 4",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "Brent_Gas-005",
    username: "username 5",
    login: "login 5",
    group: "Group 5",
    email: "email 5",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "Brent_Gas-006",
    username: "username 6",
    login: "login 6",
    group: "Group 6",
    email: "email 6",
    active: "Y",
    edit: "",
    delete: "",
  },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
}));

function AllUser() {
  const { data, error, isLoading, isSuccess } = useUserListQuery("");
  const [content, setContent] = useState<User[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const branches: User[] = [];

      for (let i = 0; i < size; i++) {
        let newrole = "";
        if (result.data[i].role === 3) {
          newrole = "Admin";
        } else if (result.data[i].role === 2) {
          newrole = "Supervisor";
        } else if (result.data[i].role === 1) {
          newrole = "Agent";
        } else {
          newrole = "";
        }

        branches.push({
          id: result.data[i].id,
          code: result.data[i].code,
          fullname: result.data[i].fullname,
          email: result.data[i].user.email,
          role: newrole,
          department: result.data[i].department.name,
          branch: result.data[i].branch.name,
          active: result.data[i].status,
          edit: result.data[i].id,
          delete: result.data[i].id,
        });
      }

      setContent(branches);
      // console.warn("Size", size);
    }
  }, [data, isSuccess]);

  console.warn("User List", content);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

  const renderCell = (params: any) => {
    if (params.colDef.field === "active" && params.value === 1) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox defaultChecked className="pointer-events-none" />
        </span>
      );
    } else if (params.colDef.field === "active" && params.value === 2) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox className="pointer-events-none" />
        </span>
      );
    } else if (params.colDef.field === "edit") {
      return (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_User modalid={params.value} />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_User modalid={params.value} />
        </span>
      );
    }

    return params.value;
  };
  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-5/6 p-5 border">
          <div className="flex">
            <div className="flex justify-start w-1/2">
              <span className="text-lg font-bold">
                <ListIcon className="align-top" /> All User
              </span>
            </div>
            <div className="flex justify-end w-1/2">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search User"
              />
            </div>
          </div>

          <div className="pt-3">
            <div className="pb-3">
              {/* <span className="font-bold text-lg">Order History</span> */}
            </div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              {/* <ThemeProvider theme={theme}> */}
              <div className="w-full h-full bg-white">
                <StyledDataGrid
                  rows={content}
                  columns={columns.map((col) => ({
                    ...col,
                    renderCell: renderCell,
                  }))}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  hideFooterSelectedRowCount
                />
              </div>
              {/* </ThemeProvider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUser;
