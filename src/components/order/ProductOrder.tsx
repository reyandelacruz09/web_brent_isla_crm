import { useEffect, useState } from "react";
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
import { useProductListQuery, useViewProductQuery } from "../../store";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  price: string;
  active: string;
  discount: string;
}

function ProductOrder() {
  const product = useProductListQuery("");
  const [productList, setProductList] = useState<Product[]>([]);
  useEffect(() => {
    if (product.isSuccess) {
      const category_result = ((product.data as any).data as Product[]) || [];
      setProductList(category_result);
    }
  }, [product.isSuccess, product.data]);

  const [array, setArray] = useState([
    { id: 0, product: "", unitPrice: "", qty: "", discount: "", subtotal: "" },
  ]);

  const [totalSubtotal, setTotalSubtotal] = useState("0.00");
  const [deliveryCharge, setDeliveryCharge] = useState("0.00");
  const [totalDiscount, setTotalDiscount] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  useEffect(() => {
    const subtotalTotal = array.reduce(
      (acc, item) => acc + parseFloat(item.subtotal || "0"),
      0
    );
    setTotalSubtotal(subtotalTotal.toFixed(2));
    setDeliveryCharge("49.00");

    const discount = parseFloat(totalDiscount) || 0;
    const delivery = parseFloat(deliveryCharge) || 0;
    const grandTotalValue = subtotalTotal + delivery - discount;
    setGrandTotal(grandTotalValue.toFixed(2));
  }, [array, totalDiscount, deliveryCharge]);

  const handleAddDiv = () => {
    setArray((prev) => [
      ...prev,
      {
        id: prev.length,
        product: "",
        unitPrice: "",
        qty: "",
        discount: "",
        subtotal: "",
      },
    ]);
  };

  const handleRemoveDiv = (idx: number) => {
    setArray((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleInputChange = (idx: number, field: string, value: string) => {
    setArray((prev) =>
      prev.map((item, index) => {
        if (index === idx) {
          const updatedItem = { ...item, [field]: value };
          if (field === "product") {
            const selectedProduct = productList.find(
              (prod) => prod.id == value
            );
            if (selectedProduct) {
              updatedItem.unitPrice = selectedProduct.price;
              updatedItem.discount = selectedProduct.discount;
            }
            console.warn(productList);
          }

          let price = updatedItem.unitPrice;
          updatedItem.unitPrice = parseFloat(price).toFixed(2);

          let newdiscount = updatedItem.discount;
          updatedItem.discount = parseFloat(newdiscount).toFixed(2);

          const qty = parseFloat(updatedItem.qty) || 0;
          const unitPrice = parseFloat(updatedItem.unitPrice) || 0;
          const discount = parseFloat(updatedItem.discount) || 0;
          updatedItem.subtotal = (qty * unitPrice - discount).toFixed(2);
          return updatedItem;
        }
        return item;
      })
    );
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
                <TableCell
                  className="bg-gray-300 w-14"
                  align="center"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((item, idx) => (
                <TableRow key={item.id}>
                  <StyledTableCell className="w-2/6 ">
                    <select
                      id="input-group-1"
                      className="w-full p-1.5 border-none bg-gray-50 border border-gray-300 text-gray-900 text-md"
                      value={item.product}
                      onChange={(e) =>
                        handleInputChange(idx, "product", e.target.value)
                      }
                    >
                      <option value=""></option>
                      {productList.map((listOption: any) => (
                        <option key={listOption.id} value={listOption.id}>
                          {listOption.name}
                        </option>
                      ))}
                    </select>
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      name="unitPrice"
                      value={item.unitPrice}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                      name="qty"
                      value={item.qty}
                      onChange={(e) =>
                        handleInputChange(idx, "qty", e.target.value)
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      name="discount"
                      value={item.discount}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      name="subtotal"
                      value={item.subtotal}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-14" align="center">
                    <span
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleRemoveDiv(idx)}
                    >
                      <DeleteForeverIcon />
                    </span>
                  </StyledTableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddDiv}
                  >
                    Add
                  </Button>
                </TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Subtotal</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    name="total_subtotal"
                    value={totalSubtotal}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    name="total_delcharge"
                    value={deliveryCharge}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    name="total_discount"
                    value={totalDiscount}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell colSpan={4} align="right">
                  <span className="pr-5">Total</span>
                </StyledTableCell>
                <StyledTableCell colSpan={1}>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                    name="total_grandtotal"
                    value={grandTotal}
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

export default ProductOrder;
