import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product Code", width: 130 },
  { field: "name", headerName: "Product Name", width: 300 },
  { field: "powner", headerName: "Product Owner", width: 200 },
  { field: "onhand", headerName: "On-Hand", width: 130 },
  { field: "ordered", headerName: "Ordered", width: 150 },
  { field: "astock", headerName: "Available Stock", width: 130 },
];

const rows = [
  {
    id: "1",
    name: "Product 1",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
  {
    id: "5",
    name: "Product 2",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
  {
    id: "6",
    name: "Product 3",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
  {
    id: "7",
    name: "Product 4",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
  {
    id: "9",
    name: "Product 5",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
  {
    id: "10",
    name: "Product 6",
    powner: "Makati Branch",
    onhand: "1",
    ordered: "2",
    astock: "3",
  },
];

const theme = createTheme();

function InventoryDetails_R() {
  return (
    <>
      <div className="pt-3">
        <div className="p-3">
          <div className="pb-3">
            {/* <span className="font-bold text-lg">Order History</span> */}
          </div>
          <div className="p-3 bg-gray-200">
            <div className="h-100 w-4/4 flex justify-center items-center">
              <ThemeProvider theme={theme}>
                <div className="w-full h-full bg-white">
                  <DataGrid
                    rows={rows}
                    columns={columns}
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

export default InventoryDetails_R;
