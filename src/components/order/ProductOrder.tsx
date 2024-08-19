import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListIcon from "@mui/icons-material/List";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useProductListQuery, useViewProductQuery } from "../../store";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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

type OrderDetails = {
  id: number;
  product: string;
  unitPrice: string;
  qty: string;
  discount: string;
  subtotal: string;
};

type ProductOrderTotal = {
  gsubtotal: string;
  gdelcharge: string;
  gdiscount: string;
  gtotal: string;
};

type orderDetailsProps = {
  productOrder: OrderDetails[];
  setProductOrder: React.Dispatch<React.SetStateAction<OrderDetails[]>>;
  productOrderTotal: ProductOrderTotal;
  setProductOrderTotal: React.Dispatch<React.SetStateAction<ProductOrderTotal>>;
};

function ProductOrder({
  productOrder,
  setProductOrder,
  productOrderTotal,
  setProductOrderTotal,
}: orderDetailsProps) {
  const product = useProductListQuery("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  useEffect(() => {
    if (product.isSuccess) {
      const category_result = ((product.data as any).data as Product[]) || [];
      setProductList(category_result);
    }
  }, [product.isSuccess, product.data]);

  // const [array, setArray] = useState([
  //   { id: 0, product: "", unitPrice: "", qty: "", discount: "", subtotal: "" },
  // ]);

  const [totalSubtotal, setTotalSubtotal] = useState("0.00");
  const [deliveryCharge, setDeliveryCharge] = useState("0.00");
  const [totalDiscount, setTotalDiscount] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  useEffect(() => {
    const subtotalTotal = productOrder.reduce(
      (acc, item) => acc + parseFloat(item.subtotal || "0"),
      0
    );
    setTotalSubtotal(subtotalTotal.toFixed(2));
    setDeliveryCharge("49.00");
  }, [productOrder]);

  useEffect(() => {
    const discount = parseFloat(totalDiscount) || 0;
    const delivery = parseFloat(deliveryCharge) || 0;
    const subtotal = parseFloat(totalSubtotal) || 0;
    const grandTotalValue = subtotal + delivery - discount;
    setGrandTotal(grandTotalValue.toFixed(2));
  }, [totalSubtotal, totalDiscount, deliveryCharge]);

  useEffect(() => {
    setProductOrderTotal({
      gsubtotal: totalSubtotal,
      gdelcharge: deliveryCharge,
      gdiscount: totalDiscount,
      gtotal: grandTotal,
    });
  }, [totalSubtotal, deliveryCharge, totalDiscount, grandTotal]);

  const handleAddDiv = () => {
    setProductOrder((prev) => [
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
    setProductOrder((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleInputChange = (idx: number, field: string, value: string) => {
    setProductOrder((prev) =>
      prev.map((item, index) => {
        if (index === idx) {
          let updatedItem = { ...item, [field]: value };
          if (field === "product") {
            const selectedProduct = productList.find(
              (prod) => prod.id == value
            );
            if (selectedProduct) {
              updatedItem.unitPrice = selectedProduct.price;
              updatedItem.discount = selectedProduct.discount;
            }
          }

          let price = updatedItem.unitPrice || "0";
          updatedItem.unitPrice = parseFloat(price).toFixed(2);

          let newDiscount = updatedItem.discount || "0";
          updatedItem.discount = parseFloat(newDiscount).toFixed(2);

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

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (productId: string) => {
    const product = productList.find((p) => p.id === productId);
    if (product && selectedIndex !== null) {
      setSelectedProduct(product);
      handleInputChange(selectedIndex, "product", product.id);
      handleCloseModal();
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = productList.filter(
    (productList) =>
      productList.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productList.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      width: 130,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 130,
    },
  ];

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
              {productOrder.map((item, idx) => (
                <TableRow key={idx}>
                  <StyledTableCell className="w-2/6 ">
                    <button
                      style={{
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e2e8f0",
                        width: "100%",
                        textAlign: "left",
                        padding: "6px",
                      }}
                      onClick={() => handleOpenModal(idx)}
                    >
                      {item.product
                        ? productList.find((p) => p.id === item.product)?.name
                        : "Select Product"}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      name="unitPrice"
                      value={productOrder[idx].unitPrice}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                      name="qty"
                      // value={item.qty}
                      value={productOrder[idx].qty}
                      onChange={(e) =>
                        handleInputChange(idx, "qty", e.target.value)
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                      name="discount"
                      value={item.discount}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
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

      {/* Product Selection Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "60vw", // 80% of viewport width
            height: "85vh", // 80% of viewport height
            maxWidth: "none", // Override default maxWidth
            maxHeight: "none", // Override default maxHeight
          },
        }}
      >
        <DialogTitle>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search Product"
            value={searchQuery}
            onChange={handleSearch}
          />
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 0 }}>
          <FormControl fullWidth>
            <div className="flex justify-center">
              <DataGrid
                sx={{
                  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                    {
                      outline: "none",
                    },
                  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                      outline: "none",
                    },
                  width: "55vw",
                  maxWidth: "none",
                }}
                rowHeight={35}
                rows={filteredContent}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                hideFooterSelectedRowCount
                onRowClick={(params: GridRowParams) =>
                  handleSelectProduct(params.row.id)
                }
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductOrder;
