import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Branch from "./Modal_Update_Branch";

export interface Branches {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  unitPrice: string;
  active: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Branch Code", width: 100 },
  { field: "bname", headerName: "Branch Name", width: 200 },
  { field: "baddress", headerName: "Address", width: 200 },
  { field: "bowner", headerName: "Branch Owner", width: 130 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "active", headerName: "Active", width: 130 },
  { field: "edit", headerName: "Edit", width: 130 },
  { field: "delete", headerName: "Delete", width: 130 },
];

const rows = [
  {
    id: "001",
    bname: "Branch 1",
    baddress: "Address 1",
    bowner: "Brent Gas",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "002",
    bname: "Branch 2",
    baddress: "Address 2",
    bowner: "One Tech",
    email: "200",
    active: "N",
    edit: "",
    delete: "",
  },
  {
    id: "003",
    bname: "Branch 3",
    baddress: "Address 3",
    bowner: "Brent Gas",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "004",
    bname: "Branch 4",
    baddress: "Address 4",
    bowner: "Aristocrat",
    email: "150",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "005",
    bname: "Branch 5",
    baddress: "Address 5",
    bowner: "Globe",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "006",
    bname: "Branch 6",
    baddress: "Address 6",
    bowner: "Brent Gas",
    email: "159",
    active: "Y",
    edit: "",
    delete: "",
  },
];

const theme = createTheme();
function AllBranches() {
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
          <Modal_Update_Branch />
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
            <ListIcon className="align-top" /> All Branches
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

export default AllBranches;
