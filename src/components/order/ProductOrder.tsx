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
}

function ProductOrder() {
  // const [productList, setProductList] = useState<Product[]>([]);
  // const { data: product, isSuccess: isProductSuccess } =
  //   useProductListQuery("");
  // useEffect(() => {
  //   if (isProductSuccess && product) {
  //     setProductList(product.data);
  //   }
  // }, [isProductSuccess, product]);

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
    // console.warn(array);
    // console.warn(productList);
  };

  const handleRemoveDiv = (idx: number) => {
    setArray((prev) => prev.filter((_, index) => index !== idx));
  };

  // const handleInputChange = (idx: any, field: any, value: any) => {
  //   const updatedArray = array.map((item, index) =>
  //     index === idx ? { ...item, [field]: value } : item
  //   );
  //   setArray(updatedArray);
  // };

  const handleInputChange = (idx: number, field: string, value: string) => {
    setArray((prev) =>
      prev.map((item, index) => {
        if (index === idx) {
          const updatedItem = { ...item, [field]: value };
          if (field === "product") {
            // Fetch product details and update unitPrice if necessary
            // Example placeholder, replace with actual fetching logic
            const selectedProduct = productList.find(
              (prod) => prod.id === value
            );

            var result = Object.entries(productList);
            console.warn(productList);
            if (selectedProduct) {
              updatedItem.unitPrice = selectedProduct.price;
            }
          }
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleInputChange(idx, "unitPrice", e.target.value)
                      }
                    />
                  </StyledTableCell>

                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.discount}
                      onChange={(e) =>
                        handleInputChange(idx, "discount", e.target.value)
                      }
                    />
                  </StyledTableCell>

                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.subtotal}
                      onChange={(e) =>
                        handleInputChange(idx, "subtotal", e.target.value)
                      }
                      disabled
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
                  <span className="pr-5">Total</span>
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

export default ProductOrder;
