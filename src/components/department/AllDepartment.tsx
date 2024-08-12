import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";
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
  { field: "id", headerName: "Department Code", width: 130 },
  { field: "depname", headerName: "Department Name", width: 200 },
  { field: "category", headerName: "Category", width: 200 },
  { field: "validity", headerName: "Validity", width: 200 },
  { field: "dephead", headerName: "Department Head", width: 180 },
  { field: "active", headerName: "Active", width: 100 },
  { field: "edit", headerName: "Edit", width: 100 },
  { field: "delete", headerName: "Delete", width: 100 },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
}));

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

  // console.warn("Department List", content);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

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
    if (params.colDef.field === "active" && params.value === 1) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox defaultChecked className="pointer-events-none" />
        </span>
      );
    } else if (params.colDef.field === "active" && params.value === 2) {
      return (
        <span className="flex justify-center items-center h-full">
          <Checkbox className="pointer-events-none" />
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
            <div className="pb-3">
              {/* <span className="font-bold text-lg">Order History</span> */}
            </div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              {/* <ThemeProvider theme={theme}> */}
              <div className="w-full h-full bg-white">
                <StyledDataGrid
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
                />
              </div>
              {/* </ThemeProvider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDepartment;
