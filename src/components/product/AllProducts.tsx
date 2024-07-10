import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Product from "./Modal_Update_Product";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product Code", width: 100 },
  { field: "pname", headerName: "Product Name", width: 200 },
  { field: "pdescription", headerName: "Product Description", width: 200 },
  { field: "powner", headerName: "Product Owner", width: 130 },
  { field: "unitprice", headerName: "Unit Price", width: 150 },
  { field: "active", headerName: "Active", width: 130 },
  { field: "edit", headerName: "Edit", width: 130 },
  { field: "delete", headerName: "Delete", width: 130 },
];

const rows = [
  {
    id: "001",
    pname: "Product 1",
    pdescription: "Description 1",
    powner: "Brent Gas",
    unitprice: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "002",
    pname: "Product 2",
    pdescription: "Description 2",
    powner: "One Tech",
    unitprice: "200",
    active: "N",
    edit: "",
    delete: "",
  },
  {
    id: "003",
    pname: "Product 3",
    pdescription: "Description 3",
    powner: "Brent Gas",
    unitprice: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "004",
    pname: "Product 4",
    pdescription: "Description 4",
    powner: "Aristocrat",
    unitprice: "150",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "005",
    pname: "Product 5",
    pdescription: "Description 5",
    powner: "Globe",
    unitprice: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "006",
    pname: "Product 6",
    pdescription: "Description 6",
    powner: "Brent Gas",
    unitprice: "159",
    active: "Y",
    edit: "",
    delete: "",
  },
];

const theme = createTheme();
function AllProducts() {
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
          {/* <EditOutlined /> */}
          <Modal_Update_Product />
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
            <ListIcon className="align-top" /> All Products
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

export default AllProducts;
