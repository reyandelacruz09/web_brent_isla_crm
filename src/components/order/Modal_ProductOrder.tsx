import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListIcon from "@mui/icons-material/List";
import { Button, styled } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

let counter = 1;
function Modal_ProductOrder() {
  const [array, setArray] = useState([0]);

  const handleAddDiv = () => {
    setArray((prev) => [...prev, counter++]);
  };

  const handleRemoveDiv = (idx: number) => {
    var arrayCopy = [...array];
    arrayCopy.splice(idx, 1); //remove the the item at the specific index
    setArray(arrayCopy);
  };

  const StyledTableCell = styled(TableCell)({
    padding: 0,
  });

  return (
    <>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-3 mt-3">
          <span className="text-lg font-bold">
            <ListIcon className="align-top" /> Product Order
          </span>
        </div>
      </div>
      <div className="pt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-gray-300 w-2/6">Product</TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Unit Price
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Qty
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Discount
                </TableCell>
                <TableCell className="bg-gray-300 w-36" align="center">
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {array.map((item, idx) => (
                <TableRow key={item}>
                  <StyledTableCell className="w-2/6 ">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                    />
                  </StyledTableCell>
                </TableRow>
              ))}

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Subtotal</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Delivery Charged</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Discount</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Grand Total</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Modal_ProductOrder;
