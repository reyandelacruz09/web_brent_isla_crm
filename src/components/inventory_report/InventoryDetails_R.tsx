import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { createTheme, Skeleton, styled, ThemeProvider } from "@mui/material";
import { useInventoryListQuery } from "../../store";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "Code",
    width: 130,
    renderCell: (params) => (
      <div className="cursor-pointer text-left pl-5">{params.value}</div>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params) => (
      <div className="cursor-pointer text-left pl-5">{params.value}</div>
    ),
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 180,
    renderCell: (params) => (
      <div className="cursor-pointer text-left pl-5">{params.value}</div>
    ),
  },
  {
    field: "receipt",
    headerName: "Receipt",
    width: 130,
    renderCell: (params) => (
      <div className="cursor-pointer text-center">{params.value}</div>
    ),
  },
  {
    field: "released",
    headerName: "Released",
    width: 150,
    renderCell: (params) => (
      <div className="cursor-pointer text-center">{params.value}</div>
    ),
  },
  {
    field: "stock",
    headerName: "Available Stock",
    width: 130,
    renderCell: (params) => (
      <div className="cursor-pointer text-center">{params.value}</div>
    ),
  },
];

interface Product {
  id: number;
  code: string;
  name: string;
  owner: string;
  receipt: string;
  released: string;
  stock: string;
}

interface InventoryDetails_RProps {
  setProducts: (products: Product) => void;
}

function InventoryDetails_R({ setProducts }: InventoryDetails_RProps) {
  const [content, setContent] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const { data, error, isLoading, isSuccess } = useInventoryListQuery({
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
        let newreceipt = result[i].receipt === 0 ? "-" : result[i].receipt;
        let newreleased = result[i].released === 0 ? "-" : result[i].released;
        let newstock = result[i].stock === 0 ? "-" : result[i].stock;

        products.push({
          id: result[i].id,
          code: result[i].code,
          name: result[i].name,
          owner: result[i].branch.name,
          receipt: newreceipt,
          released: newreleased,
          stock: newstock,
        });
        // console.warn(newstock);
      }

      setContent(products);
      setTotalCount(data.count);
    }
  }, [data, isSuccess]);

  const handleRowClick = (params: any) => {
    setProducts({
      id: params.row.id,
      code: params.row.code,
      name: params.row.name,
      owner: params.row.owner,
      receipt: params.row.receipt,
      released: params.row.released,
      stock: params.row.stock,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = content.filter(
    (product) =>
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="pt-3">
        <div className="p-3">
          <div className="flex justify-end pr-3 w-full">
            <input
              type="text"
              id="input-group-1"
              name="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
              placeholder="Search Code / Name / Owner"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="pb-3"></div>
          <div className="p-3 bg-gray-200">
            <div className="h-100 w-4/4 flex justify-center items-center">
              <div className="w-full h-full bg-white">
                {isLoading ? (
                  <Skeleton />
                ) : error ? (
                  "No data available"
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
                    rows={loadingNextPage || isLoading ? [] : filteredContent}
                    columns={columns}
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
                    onRowClick={handleRowClick}
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

export default InventoryDetails_R;
