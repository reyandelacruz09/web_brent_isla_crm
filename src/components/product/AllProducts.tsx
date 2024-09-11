import ListIcon from "@mui/icons-material/List";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import {
  Checkbox,
  createTheme,
  Skeleton,
  styled,
  ThemeProvider,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Product from "./Modal_Update_Product";
import { useGetRolesQuery, useProductListQuery } from "../../store";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import Modal_Delete_Product from "./Modal_Delete_Product";
import { EditOutlined } from "@mui/icons-material";
import { Slide, toast } from "react-toastify";

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

function AllProducts() {
  const { data, error, isLoading, isSuccess } = useProductListQuery("");
  const [content, setContent] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          price: result.data[i].price.toFixed(2),
          active: result.data[i].status,
          edit: result.data[i].id,
          delete: result.data[i].id,
        });
      }

      setContent(products);
    }
  }, [data, isSuccess]);

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = content.filter(
    (product) =>
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCell = (params: any) => {
    const isActive = params.colDef.field === "active";
    const isChecked = isActive && params.value === 1;

    if (isActive) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox checked={isChecked} className="pointer-events-none" />
        </span>
      );
    } else if (params.colDef.field === "edit") {
      return getRolesAPI.data?.data.products.edit === true ? (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_Product modalid={params.value} />
        </span>
      ) : (
        <span
          className="flex justify-center items-center h-full text-blue-500 cursor-pointer"
          onClick={() =>
            toast.warning("You dont have access with your current license!", {
              transition: Slide,
            })
          }
        >
          <EditOutlined />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return getRolesAPI.data?.data.products.delete === true ? (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_Product modalid={params.value} />
        </span>
      ) : (
        <span
          className="flex justify-center items-center h-full text-red-500 cursor-pointer"
          onClick={() =>
            toast.warning("You dont have access with your current license!", {
              transition: Slide,
            })
          }
        >
          <DeleteForeverOutlinedIcon />
        </span>
      );
    } else if (params.colDef.field === "price") {
      return (
        <span className="flex justify-center items-center">{params.value}</span>
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
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="pt-3">
            <div className="pb-3">
              {/* <span className="font-bold text-lg">Order History</span> */}
            </div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              <div className="w-full h-full bg-white">
                {isLoading ? (
                  <Skeleton />
                ) : error ? (
                  "No Data Available"
                ) : (
                  <DataGrid
                    sx={{
                      height: "515px",
                      [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                        {
                          outline: "none",
                        },
                      [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                        {
                          outline: "none",
                        },
                    }}
                    rowHeight={40}
                    rows={filteredContent}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
