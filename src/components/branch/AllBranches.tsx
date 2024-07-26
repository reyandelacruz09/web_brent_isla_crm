import ListIcon from "@mui/icons-material/List";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox, createTheme, ThemeProvider } from "@mui/material";
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

const rows = [
  {
    id: "001",
    bname: "Branch 1",
    baddress: "Address 1",
    bowner: "Brent Gas",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "002",
    bname: "Branch 2",
    baddress: "Address 2",
    bowner: "One Tech",
    email: "200",
    active: "N",
    edit: "",
    delete: "",
  },
  {
    id: "003",
    bname: "Branch 3",
    baddress: "Address 3",
    bowner: "Brent Gas",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "004",
    bname: "Branch 4",
    baddress: "Address 4",
    bowner: "Aristocrat",
    email: "150",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "005",
    bname: "Branch 5",
    baddress: "Address 5",
    bowner: "Globe",
    email: "100",
    active: "Y",
    edit: "",
    delete: "",
  },
  {
    id: "006",
    bname: "Branch 6",
    baddress: "Address 6",
    bowner: "Brent Gas",
    email: "159",
    active: "Y",
    edit: "",
    delete: "",
  },
];

const theme = createTheme();
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
          <span className="text-lg font-bold">
            <ListIcon className="align-top" /> All Branches
          </span>

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

export default AllBranches;
