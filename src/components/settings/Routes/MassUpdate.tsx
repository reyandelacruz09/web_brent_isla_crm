import React, { useEffect, useState } from "react";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useGetCustomerFilterQuery } from "../../../store";
import { Button, Typography } from "@mui/material";
import MassUpdateFinal from "./MassUpdateFinal";

interface Customer {
  id: number;
  fname: string;
  lname: string;
  phone1: string;
  branch: string;
  block_unit: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
}
function MassUpdate({ cond }: any) {
  const [content, setContent] = useState<Customer[]>([]);

  const getFilteredCustomer = useGetCustomerFilterQuery({
    conditions: cond,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (getFilteredCustomer.isSuccess && getFilteredCustomer.data) {
      let result: any = [];
      result = getFilteredCustomer.data;

      const size = Object.keys(result.data).length;
      const customer: Customer[] = [];
      if (size > 0) {
        for (let i = 0; i < size; i++) {
          customer.push({
            id: result.data[i].id,
            fname: result.data[i].fname,
            lname: result.data[i].lname,
            phone1: result.data[i].phone1,
            branch: result.data[i].branch_assignment.name,
            block_unit: result.data[i].block_unit,
            barangay: result.data[i].barangay.name,
            city: result.data[i].barangay.city.name,
            province: result.data[i].barangay.city.province.name,
            region: result.data[i].barangay.city.province.region.name,
          });
        }
      } else {
        customer.push({
          id: 0,
          fname: "",
          lname: "",
          phone1: "",
          branch: "",
          block_unit: "",
          barangay: "",
          city: "",
          province: "",
          region: "",
        });
      }
      // console.log(getFilteredCustomer.data);
      setContent(customer);
    }
  }, [getFilteredCustomer.isSuccess, getFilteredCustomer.data]);

  const columns: GridColDef[] = [
    { field: "fname", headerName: "First Name", width: 130 },
    { field: "lname", headerName: "Last Name", width: 130 },
    { field: "phone1", headerName: "Phone1", width: 130 },
    { field: "branch", headerName: "Branch Assignment", width: 150 },
    { field: "block_unit", headerName: "Street", width: 200 },
    { field: "barangay", headerName: "Barangay", width: 150 },
    { field: "city", headerName: "City", width: 130 },
    { field: "province", headerName: "Province", width: 130 },
    { field: "region", headerName: "Region", width: 130 },
  ];
  const renderCell = (params: any) => {
    return params.value;
  };

  const massUpdate = () => {
    alert(rowSelectionModel);
  };
  return (
    <>
      <div className="py-3">
        {rowSelectionModel.length === 0 ? (
          <Typography>No of selected rows: 0</Typography>
        ) : (
          <div>
            No of selected rows: {rowSelectionModel.length}
            <MassUpdateFinal id={rowSelectionModel} />
          </div>
        )}
      </div>
      <div className="flex justify-center gap-5 pb-10">
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
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          // hideFooterSelectedRowCount
        />
      </div>
    </>
  );
}

export default MassUpdate;
