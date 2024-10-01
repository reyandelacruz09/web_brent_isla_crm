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
import Modal_Update_User from "./Modal_Update_User";
import { useGetRolesQuery, useUserListQuery } from "../../store";
import { useEffect, useState } from "react";
import Modal_Delete_User from "./Modal_Delete_User";
import { EditOutlined } from "@mui/icons-material";
import { Slide, toast } from "react-toastify";

interface User {
  id: string;
  code: string;
  fullname: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  active: string;
  edit: string;
  delete: string;
}

const columns: GridColDef[] = [
  { field: "code", headerName: "Code", width: 80 },
  { field: "fullname", headerName: "Fullname", width: 180 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "department", headerName: "Department", width: 150 },
  { field: "branch", headerName: "Branch", width: 150 },
  { field: "active", headerName: "Active", width: 100 },
  { field: "edit", headerName: "Edit", width: 100 },
  { field: "delete", headerName: "Delete", width: 100 },
];

function AllUser() {
  const [content, setContent] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const { data, error, isLoading, isSuccess } = useUserListQuery({
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });

  useEffect(() => {
    if (isSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      result = data.results;

      const size = Object.keys(result).length;
      const branches: User[] = [];

      for (let i = 0; i < size; i++) {
        let newrole = "";
        if (result[i].role === 3) {
          newrole = "Admin";
        } else if (result[i].role === 2) {
          newrole = "Supervisor";
        } else if (result[i].role === 1) {
          newrole = "Agent";
        } else {
          newrole = "";
        }

        branches.push({
          id: result[i].id,
          code: result[i].code,
          fullname: result[i].fullname,
          email: result[i].user.email,
          role: newrole,
          department: result[i].department.name,
          branch: result[i].branch.name,
          active: result[i].status,
          edit: result[i].id,
          delete: result[i].id,
        });
      }

      setContent(branches);
      setTotalCount(data.count);
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
    setPage(0);
  };

  const filteredContent = content.filter(
    (user) =>
      user.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
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
      return getRolesAPI.data?.data.user.edit === true ? (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_User modalid={params.value} />
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
      return getRolesAPI.data?.data.user.delete === true ? (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_User modalid={params.value} />
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
                <ListIcon className="align-top" /> All User
              </span>
            </div>
            <div className="flex justify-end w-1/2">
              <input
                type="text"
                id="input-group-1"
                name="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 p-1.5"
                placeholder="Search User"
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
                )}
              </div>
              {/* </ThemeProvider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUser;
