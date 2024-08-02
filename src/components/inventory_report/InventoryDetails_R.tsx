import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { useProductListQuery } from "../../store";
import { useEffect, useState } from "react";

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

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  price: string;
  active: string;
  edit: string;
  delete: string;
}

const theme = createTheme();

function InventoryDetails_R() {
  const { data, error, isLoading, isSuccess } = useProductListQuery("");
  const [content, setContent] = useState<Product[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const products: Product[] = [];

      for (let i = 0; i < size; i++) {
        products.push({
          id: result.data[i].id,
          code: result.data[i].code,
          name: result.data[i].name,
          description: result.data[i].description,
          owner: result.data[i].branch.name,
          price: result.data[i].price,
          active: result.data[i].status,
          edit: result.data[i].id,
          delete: result.data[i].id,
        });
      }

      setContent(products);
    }
  }, [data, isSuccess]);

  console.warn(content);

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
                    rows={content}
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
