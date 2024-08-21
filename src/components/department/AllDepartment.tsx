import ListIcon from "@mui/icons-material/List";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Checkbox, Skeleton } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Modal_Update_Department from "./Modal_Update_Department";
import { useClientListQuery } from "../../store";
import { useEffect, useState } from "react";
import Modal_Delete_Client from "./Modal_Delete_Client";

interface Client {
  id: string;
  depname: string;
  category: string;
  validity: string;
  dephead: string;
  active: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  // { field: "id", headerName: "Department Code", width: 130 },
  { field: "depname", headerName: "Department Name", width: 200 },
  { field: "cperson", headerName: "Contact Person", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "validity", headerName: "Validity", width: 200 },
  { field: "rdate", headerName: "Renewal Date", width: 130 },
  { field: "plan", headerName: "Plan", width: 100 },
  { field: "license", headerName: "No of Licenses", width: 100 },

  // { field: "category", headerName: "Category", width: 200 },
  // { field: "validity", headerName: "Validity", width: 200 },
  // { field: "dephead", headerName: "Department Head", width: 180 },
  // { field: "active", headerName: "Active", width: 100 },
  { field: "edit", headerName: "Edit", width: 100 },
  // { field: "delete", headerName: "Delete", width: 100 },
];

function AllDepartment() {
  const { data, error, isLoading, isSuccess } = useClientListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const branches: Client[] = [];

      for (let i = 0; i < size; i++) {
        branches.push({
          id: result.data[i].code,
          depname: result.data[i].name,
          category: result.data[i].category.name,
          validity: result.data[i].start_date + " - " + result.data[i].end_date,
          dephead: result.data[i].head,
          active: result.data[i].status,
          edit: result.data[i].id,
          delete: result.data[i].id,
        });
      }

      setContent(branches);
      // console.warn("Size", size);
    }
  }, [data, isSuccess]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = content.filter(
    (client) =>
      client.depname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.dephead.toLowerCase().includes(searchQuery.toLowerCase())
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
      return (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_Department modalid={params.value} />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_Client modalid={params.value} />
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
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="pt-3">
            <div className="pb-3"></div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              <div className="w-full h-full bg-white">
                {isLoading ? (
                  <Skeleton />
                ) : error ? (
                  "No data available"
                ) : (
                  <DataGrid
                    sx={{
                      [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                        {
                          outline: "none",
                        },
                      [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                        {
                          outline: "none",
                        },
                    }}
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
                    pageSizeOptions={[5, 10]}
                    hideFooterSelectedRowCount
                    slots={{ toolbar: GridToolbar }}
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

export default AllDepartment;
