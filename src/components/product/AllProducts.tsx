import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Product from "./Modal_Update_Product";
import { useProductListQuery } from "../../store";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import Modal_Delete_Product from "./Modal_Delete_Product";

export interface Product {
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

const columns: GridColDef[] = [
  { field: "code", headerName: "Product Code", width: 100 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "description", headerName: "Product Description", width: 200 },
  { field: "owner", headerName: "Product Owner", width: 130 },
  { field: "price", headerName: "Unit Price", width: 150 },
  { field: "active", headerName: "Active", width: 130 },
  { field: "edit", headerName: "Edit", width: 130 },
  { field: "delete", headerName: "Delete", width: 130 },
];

const theme = createTheme();
function AllProducts() {
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

  // console.warn(content);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

  const renderCell = (params: any) => {
    if (params.colDef.field === "active" && params.value === 1) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox defaultChecked />
        </span>
      );
    } else if (params.colDef.field === "active" && params.value === 2) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox />
        </span>
      );
    } else if (params.colDef.field === "edit") {
      return (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          {/* <EditOutlined /> */}
          <Modal_Update_Product modalid={params.value} />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_Product modalid={params.value} />
          {/* <DeleteForeverOutlinedIcon /> */}
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
                <ListIcon className="align-top" /> All Products
              </span>{" "}
            </div>
            <div className="flex justify-end w-1/2">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search Product"
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
                    pageSizeOptions={[5, 10, 20, 50, 100]}
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
