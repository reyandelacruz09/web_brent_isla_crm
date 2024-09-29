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
import { CircularProgress } from "@mui/material";

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  price: string;
  status: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  { field: "code", headerName: "Product Code", width: 100 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "description", headerName: "Product Description", width: 200 },
  { field: "owner", headerName: "Branch Owner", width: 130 },
  { field: "price", headerName: "Unit Price", width: 150 },
  { field: "status", headerName: "Active", width: 130 },
  { field: "edit", headerName: "Edit", width: 130 },
  { field: "delete", headerName: "Delete", width: 130 },
];

function AllProducts() {
  const [content, setContent] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const { data, error, isLoading, isSuccess } = useProductListQuery({
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
    owner: account_detailed1.department.id,
  });

  useEffect(() => {
    if (isSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      let content: any = [];
      result = data.results;

      const size = Object.keys(result).length;
      const products: Product[] = [];

      for (let i = 0; i < size; i++) {
        let branchName = result[i].branch.name;
        products.push({
          id: result[i].id,
          code: result[i].code,
          name: result[i].name,
          description: result[i].description,
          owner: branchName,
          price: result[i].price.toFixed(2),
          status: result[i].status,
          edit: result[i].id,
          delete: result[i].id,
        });
      }

      setContent(products);
      setTotalCount(data.count);
    }
  }, [data, isSuccess]);

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredContent = content.filter(
    (product) =>
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCell = (params: any) => {
    const isActive = params.colDef.field === "status";
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
                  rows={loadingNextPage || isLoading ? [] : filteredContent}
                  columns={columns.map((col) => ({
                    ...col,
                    renderCell: renderCell,
                  }))}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        page: 0,
                        pageSize: 10,
                      },
                    },
                  }}
                  paginationMode="server"
                  pagination
                  paginationModel={{ page, pageSize }}
                  pageSizeOptions={[5, 10, 20, 50, 100]}
                  rowCount={totalCount}
                  onPaginationModelChange={(newModel) => {
                    setPage(newModel.page);
                    setPageSize(newModel.pageSize);
                    setLoadingNextPage(true);
                  }}
                  loading={loadingNextPage}
                  hideFooterSelectedRowCount
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
