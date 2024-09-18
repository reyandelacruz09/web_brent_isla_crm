import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Button, Table, TableCell, TableRow, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  useGetCustomerFieldQuery,
  useGetCustomerFilterQuery,
} from "../../../store";
import MassUpdate from "./MassUpdate";

interface Condition {
  id: number;
  cond: string;
  operator: string;
  value: string;
}

function UpdateRoute() {
  const StyledTableCell = styled(TableCell)({
    padding: 0,
    alignContent: "center",
  });

  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState<Condition[]>([
    {
      id: 0,
      cond: "",
      operator: "1",
      value: "",
    },
  ]);
  const [submitCon, setSubmitCon] = useState("");
  const [custFields, setCustFields] = useState([]);
  const [query, setQuery] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDiv = () => {
    setConditions((prev) => [
      ...prev,
      {
        id: prev.length,
        cond: "",
        operator: "1",
        value: "",
      },
    ]);
  };

  const handleRemoveDiv = (id: number) => {
    setConditions((prev) => prev.filter((condition) => condition.id !== id));
  };

  const handleInputChange = (
    id: number,
    field: keyof Condition,
    value: string
  ) => {
    setConditions((prev) =>
      prev.map((condition) =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };

  const getCustField = useGetCustomerFieldQuery("");

  useEffect(() => {
    if (getCustField.isSuccess && getCustField.data) {
      setCustFields(getCustField.data?.field_names);
    }
  }, [getCustField.isSuccess, getCustField.data]);

  const handleSearch = () => {
    console.log("Query", query);
    const jsonConditions = JSON.stringify(conditions);
    const encodedConditions = encodeURIComponent(jsonConditions);

    setSubmitCon(encodedConditions);

    console.log("Conditions: ", encodedConditions);
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        className="w-40 pt-1"
        tabIndex={-1}
        size="small"
        color="warning"
        onClick={handleClickOpen}
      >
        <span className="">Mass Update</span>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-full">Mass Update</div>
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="justify-center">
            <Typography variant="h6">Criteria</Typography>
            <div className="">
              {conditions.map(({ id, cond, operator, value }) => (
                <div className="w-full flex justify-center">
                  <div
                    className="flex gap-5 justify-center py-1  w-4/5"
                    key={id}
                  >
                    <div className="flex w-full gap-5">
                      <div className="w-1/3">
                        <select
                          value={cond}
                          onChange={(e) =>
                            handleInputChange(id, "cond", e.target.value)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {custFields.map((field, idx) => (
                            <option key={idx} value={field}>
                              {field}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-1/3">
                        <select
                          value={operator}
                          onChange={(e) =>
                            handleInputChange(id, "operator", e.target.value)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="1">equals</option>
                          <option value="2">contains</option>
                        </select>
                      </div>
                      <div className="w-1/3 flex gap-5">
                        <div className="w-4/5">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleInputChange(id, "value", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="w-1/5">
                          {id === 0 ? (
                            ""
                          ) : (
                            <span
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleRemoveDiv(id)}
                            >
                              <DeleteForeverIcon />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full flex justify-center">
                <div className="flex gap-5 pt-4 content-center w-4/5">
                  <div className="flex w-full gap-5">
                    <div className="w-1/3 flex justify-start">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddDiv}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 flex justify-end">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSearch}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-3" />

          <MassUpdate cond={submitCon} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default UpdateRoute;
