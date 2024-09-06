import React, { useCallback, useEffect, useState } from "react";
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
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useProductListQuery, useProductListBranchQuery } from "../../store"; // Adjust this import based on your actual query hook

// Define interfaces for the props and state
interface Product {
  id: number;
  code: string;
  name: string;
  price: string;
  stock: string;
  discount: string;
}

interface ProductOrderItem {
  id: number;
  product: string;
  unitPrice: string;
  qty: string;
  discount: string;
  subtotal: string;
}

interface ProductOrderProps {
  branch: string;
  productOrder: ProductOrderItem[];
  setProductOrder: React.Dispatch<React.SetStateAction<ProductOrderItem[]>>;
  productOrderTotal: {
    gsubtotal: string;
    gdelcharge: string;
    gdiscount: string;
    gtotal: string;
  };
  setProductOrderTotal: React.Dispatch<
    React.SetStateAction<{
      gsubtotal: string;
      gdelcharge: string;
      gdiscount: string;
      gtotal: string;
    }>
  >;
}

const StyledTableCell = styled(TableCell)({
  padding: 0,
});

const ProductOrder: React.FC<ProductOrderProps> = ({
  branch,
  productOrder,
  setProductOrder,
  productOrderTotal,
  setProductOrderTotal,
}) => {
  const product = useProductListBranchQuery({ branch: branch });
  const [productList, setProductList] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (product.isSuccess) {
      const category_result = ((product.data as any).data as Product[]) || [];
      setProductList(category_result);
    }
  }, [product.isSuccess, product.data]);

  const [totalSubtotal, setTotalSubtotal] = useState("0.00");
  const [deliveryCharge, setDeliveryCharge] = useState("0.00");
  const [totalDiscount, setTotalDiscount] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  useEffect(() => {
    const subtotalTotal = productOrder.reduce(
      (acc, item) => acc + parseFloat(item.subtotal || "0"),
      0
    );
    const discountTotal = productOrder.reduce(
      (acc, item) => acc + parseFloat(item.discount || "0"),
      0
    );
    setTotalSubtotal(subtotalTotal.toFixed(2));
    setTotalDiscount(discountTotal.toFixed(2));
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

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (productId: number) => {
    const product = productList.find((p) => p.id === productId);
    if (product && selectedIndex !== null) {
      setSelectedProduct(product);
      //.replace(/\d(?=(\d{3})+\.)/g, '$&,');
      setProductOrder((prev) => {
        const newProductOrder = [...prev];
        newProductOrder[selectedIndex] = {
          ...newProductOrder[selectedIndex],
          product: product.id.toString(),
          unitPrice: parseFloat(product.price).toFixed(2).toString(),
          discount: parseFloat(product.discount).toFixed(2).toString(),
          qty: "1",
          subtotal: (
            parseFloat(product.price) *
              parseFloat(newProductOrder[selectedIndex].qty || "1") -
            parseFloat(product.discount)
          ).toFixed(2),
        };
        return newProductOrder;
      });
      handleCloseModal();
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = productList.filter(
    (product) =>
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", width: 130 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
  ];

  const renderCell = (params: any) => {
    if (params.colDef.field === "price") {
      return (
        <div className="text-right pr-5">
          <span>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(params.value ? params.value : "0"))}
          </span>
        </div>
      );
    } else if (params.colDef.field === "stock") {
      return (
        <div className="text-right pr-5">
          <span>{params.value}</span>
        </div>
      );
    }

    return params.value;
  };

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
                <TableRow key={item.id || idx}>
                  <StyledTableCell className="w-2/6">
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
                      {/* {item.product
                        ? productList.find((p) => p.id === item.product)?.name
                        : "Select Product"} */}
                      {item.product
                        ? productList.find(
                            (p) => p.id === parseInt(item.product)
                          )?.name
                        : "Select Product"}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                      value={item.unitPrice}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-center"
                      value={item.qty}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProductOrder((prev) => {
                          const newProductOrder = [...prev];
                          newProductOrder[idx] = {
                            ...newProductOrder[idx],
                            qty: value,
                            subtotal: (
                              (parseFloat(
                                newProductOrder[idx].unitPrice || "0"
                              ) -
                                parseFloat(
                                  newProductOrder[idx].discount || "0"
                                )) *
                              parseFloat(value || "0")
                            ).toFixed(2),
                          };
                          return newProductOrder;
                        });
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                      value={item.discount}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell className="w-36" align="center">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                      value={new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        parseFloat(item.subtotal ? item.subtotal : "0")
                      )}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                    value={new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(parseFloat(totalSubtotal ? totalSubtotal : "0"))}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                    value={new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      parseFloat(deliveryCharge ? deliveryCharge : "0")
                    )}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                    value={new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(parseFloat(totalDiscount ? totalDiscount : "0"))}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 text-right"
                    value={new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(parseFloat(grandTotal ? grandTotal : "0"))}
                    disabled
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "60vw",
            height: "85vh",
            maxWidth: "none",
            maxHeight: "none",
          },
        }}
      >
        <DialogTitle>
          <Input
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
};

export default ProductOrder;
