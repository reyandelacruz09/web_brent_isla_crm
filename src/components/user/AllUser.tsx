import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_User from "./Modal_Update_User";

const columns: GridColDef[] = [
  { field: "id", headerName: "Agent Code", width: 130 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "login", headerName: "Log-In", width: 200 },
  { field: "group", headerName: "Group", width: 130 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "active", headerName: "Active", width: 130 },
  { field: "edit", headerName: "Edit", width: 130 },
  { field: "delete", headerName: "Delete", width: 130 },
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

const theme = createTheme();
function AllUser() {
  const renderCell = (params: any) => {
    if (params.colDef.field === "active" && params.value === "Y") {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox defaultChecked />
        </span>
      );
    } else if (params.colDef.field === "active" && params.value === "N") {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox />
        </span>
      );
    } else if (params.colDef.field === "edit") {
      return (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_User />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <DeleteForeverOutlinedIcon />
        </span>
      );
    }

    return params.value;
  };
  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-5/6 p-5 border">
          <span className="text-lg font-bold">
            <ListIcon className="align-top" /> All User
          </span>

          <div className="pt-3">
            <div className="pb-3">
              {/* <span className="font-bold text-lg">Order History</span> */}
            </div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              <ThemeProvider theme={theme}>
                <div className="w-full h-full bg-white">
                  <DataGrid
                    rows={rows}
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
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUser;
