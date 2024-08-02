import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Department from "./Modal_Update_Department";
// import Modal_Update_User from "./Modal_Update_User";

const columns: GridColDef[] = [
  { field: "id", headerName: "Department Code", width: 130 },
  { field: "depname", headerName: "Department Name", width: 200 },
  { field: "category", headerName: "Category", width: 200 },
  { field: "validity", headerName: "Validity", width: 200 },
  { field: "dephead", headerName: "Department Head", width: 180 },
  { field: "active", headerName: "Active", width: 100 },
  { field: "edit", headerName: "Edit", width: 100 },
  { field: "delete", headerName: "Delete", width: 100 },
];

const rows = [
  {
    id: "0001",
    depname: "Brent Gas",
    category: "Petroleum",
    validity: "12/25/2024 - 12/25/2025",
    dephead: "Orlhie S. Almendares",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "0002",
    depname: "Aristocrat",
    category: "Food and Beverages",
    validity: "12/25/2024 - 12/25/2025",
    dephead: "Orlhie S. Almendares",
    active: "N",
    edit: "",
    delete: "",
  },
  {
    id: "0003",
    depname: "Wendys",
    category: "Food and Beverages",
    validity: "12/25/2024 - 12/25/2025",
    dephead: "Orlhie S. Almendares",
    active: "Y",
    edit: "",
    delete: "",
  },
];

const theme = createTheme();
function AllDepartment() {
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
          <Modal_Update_Department />
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
          <div className="flex">
            <div className="flex justify-start w-1/2">
              <span className="text-lg font-bold">
                <ListIcon className="align-top" /> All Department
              </span>
            </div>
            <div className="flex justify-end w-1/2">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search Department"
              />
            </div>
          </div>

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

export default AllDepartment;
