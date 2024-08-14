import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, styled, ThemeProvider } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal_Update_Branch from "./Modal_Update_Branch";
import { useBranchListQuery } from "../../store";
import { useEffect, useState } from "react";
import Modal_Delete_Branch from "./Modal_Delete_Branch";

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
  { field: "code", headerName: "Branch Code", width: 100 },
  { field: "name", headerName: "Branch Name", width: 200 },
  { field: "barangay", headerName: "Address", width: 350 },
  { field: "owner", headerName: "Branch Owner", width: 130 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "active", headerName: "Active", width: 80 },
  { field: "edit", headerName: "Edit", width: 80 },
  { field: "delete", headerName: "Delete", width: 80 },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
}));
function AllBranches() {
  const { data, error, isLoading, isSuccess } = useBranchListQuery("");
  const [content, setContent] = useState<Branch[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = data;

      const size = Object.keys(result.data).length;
      const branches: Branch[] = [];

      for (let i = 0; i < size; i++) {
        branches.push({
          id: result.data[i].id,
          client: result.data[i].client,
          code: result.data[i].code,
          name: result.data[i].name,
          active: result.data[i].active,
          owner: result.data[i].owner.name,
          block_street: result.data[i].block_street,
          barangay:
            result.data[i].block_street +
            " " +
            result.data[i].barangay.name +
            ", " +
            result.data[i].barangay.city.name,
          email: result.data[i].email,
          edit: result.data[i].id,
          delete: result.data[i].id,
          data: undefined,
        });
      }

      //console.warn(size);

      setContent(branches);
    }
  }, [data, isSuccess]);

  //console.log(content);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading data</div>;
  }

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
          <Modal_Update_Branch modalid={params.value} />
        </span>
      );
    } else if (params.colDef.field === "delete") {
      return (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_Branch modalid={params.value} />
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
                <ListIcon className="align-top" /> All Branches
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
            <div className="pb-3">
              {/* <span className="font-bold text-lg">Order History</span> */}
            </div>
            <div className="h-100 w-4/4 flex justify-center items-center">
              <div className="w-full h-full bg-white">
                <StyledDataGrid
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

export default AllBranches;
