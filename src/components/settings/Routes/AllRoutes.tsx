import ListIcon from "@mui/icons-material/List";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";

interface Branch {
  data: any;
  id: string;
  client: string;
  code: string;
  name: string;
  active: string;
  owner: string;
  block_street: string;
  barangay: string;
  email: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  { field: "department", headerName: "Department", width: 200 },
  { field: "caddress", headerName: "Complete Address", width: 200 },
  { field: "branch", headerName: "Branch Assignment", width: 350 },
  { field: "routing", headerName: "Routing", width: 350 },
];

function AllRoutes() {
  const [content, setContent] = useState<Branch[]>([]);
  const renderCell = (params: any) => {
    return params.value;
  };
  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-5/6 p-5 border">
          <div className="flex">
            <div className="flex justify-start w-1/2">
              <span className="text-lg font-bold">
                <ListIcon className="align-top" /> All Routes
              </span>
            </div>
            <div className="flex justify-end w-1/2">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search Branch"
              />
            </div>
          </div>

          <div className="pt-3">
            <div className="pb-3"></div>
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
                  pageSizeOptions={[5, 10]}
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

export default AllRoutes;
