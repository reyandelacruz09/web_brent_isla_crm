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
  const { data, error, isLoading, isSuccess } = useInventoryListQuery("");
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
        let newreceipt =
          result.data[i].receipt === 0 ? "-" : result.data[i].receipt;
        let newreleased =
          result.data[i].released === 0 ? "-" : result.data[i].released;
        let newstock = result.data[i].stock === 0 ? "-" : result.data[i].stock;

        products.push({
          id: result.data[i].id,
          code: result.data[i].code,
          name: result.data[i].name,
          owner: result.data[i].branch.name,
          receipt: newreceipt,
          released: newreleased,
          stock: newstock,
        });
        // console.warn(newstock);
      }

      setContent(products);
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
                    rows={filteredContent}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
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
