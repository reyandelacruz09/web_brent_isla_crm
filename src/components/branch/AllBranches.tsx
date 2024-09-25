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
import Modal_Update_Branch from "./ModalUpdateBranch";
import { useBranchListQuery, useGetRolesQuery } from "../../store";
import { useEffect, useState } from "react";
import Modal_Delete_Branch from "./ModalDeleteBranch";
import { Slide, toast } from "react-toastify";
import { EditOutlined } from "@mui/icons-material";

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

function AllBranches() {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const [content, setContent] = useState<Branch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const { data, error, isLoading, isSuccess } = useBranchListQuery({
    owner: account_detailed1.department.id,
    page: page,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });

  useEffect(() => {
    if (isSuccess) {
      setLoadingNextPage(false);
      let result: any = [];
      let content: any = [];
      result = data.results;

      const size = Object.keys(result).length;
      const branches: Branch[] = [];

      for (let i = 0; i < size; i++) {
        branches.push({
          id: result[i].id,
          client: result[i].client,
          code: result[i].code,
          name: result[i].name,
          active: result[i].active,
          owner: result[i].owner.name,
          block_street: result[i].block_street,
          barangay:
            result[i].block_street +
            " " +
            result[i].barangay.name +
            ", " +
            result[i].barangay.city.name,
          email: result[i].email,
          edit: result[i].id,
          delete: result[i].id,
          data: undefined,
        });
      }
      setContent(branches);
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
    (branch) =>
      branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.owner.toLowerCase().includes(searchQuery.toLowerCase())
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
      return getRolesAPI.data?.data.branch.edit === true ? (
        <span className="flex justify-center items-center h-full text-blue-500 cursor-pointer">
          <Modal_Update_Branch modalid={params.value} />
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
      return getRolesAPI.data?.data.branch.delete === true ? (
        <span className="flex justify-center items-center h-full text-red-500 cursor-pointer">
          <Modal_Delete_Branch modalid={params.value} />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBranches;
