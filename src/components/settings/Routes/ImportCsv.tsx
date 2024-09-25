import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Button, Table, TableCell, TableRow, Typography } from "@mui/material";
import {
  useGetCustomerFieldQuery,
  useGetCustomerFilterQuery,
} from "../../../store";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

interface Condition {
  id: number;
  cond: string;
  operator: string;
  value: string;
}

function ImportCsv() {
  const [open, setOpen] = useState(false);
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  //   const [importLeads] = useUploadLeadsFromExcelMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    const importUsers = {
      bulk_lead: data.validData,
      session: account_detailed1.id,
    };

    // console.log("Datas: ", importUsers);
    // const csvLeds = await importLeads(importedLeads).unwrap();
    // if (csvLeds.success === true) {
    //    ToastSuccess
    // } else {
    //     ToastError
    // }
    // csvLeadsRefetch();
    onClose();
  };

  const fields = [
    {
      label: "First Name",
      key: "fname",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Last Name",
      key: "lname",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Phone Number 1",
      key: "phone1",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Phone Number 2",
      key: "phone2",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Landline",
      key: "landline",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Email",
      key: "email",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Block Unit",
      key: "block_unit",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Barangay",
      key: "barangay",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Company",
      key: "company",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Nearest Landmark",
      key: "nearest_landmark",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Department",
      key: "department",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Branch Assignment",
      key: "branch_assignment",
      fieldType: {
        type: "input",
      },
    },
  ];

  return (
    <>
      <Button
        component="label"
        variant="contained"
        className="w-40 pt-1"
        tabIndex={-1}
        size="small"
        color="success"
        onClick={handleClickOpen}
      >
        <span className="">Import CSV file</span>
      </Button>
      <ReactSpreadsheetImport
        isOpen={open}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={fields}
      />
    </>
  );
}

export default ImportCsv;
