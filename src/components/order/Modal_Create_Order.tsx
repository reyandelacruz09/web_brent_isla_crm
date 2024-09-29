import * as React from "react";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import CustomerInformation from "./CustomerInformation";
import ProductOrder from "./ProductOrder";
import Others from "./Others";

import { useEffect, useState } from "react";
import { adress } from "../branch/AddBranch";
import {
  useBranchListQuery,
  useCreateOrderMutation,
  useViewBranchQuery,
  useCustomerInfoQuery,
  useGetRolesQuery,
  useLocateAddressQuery,
} from "../../store";
import { Client } from "../product/AddProduct";

import "react-datepicker/dist/react-datepicker.css";
import Modal_Order_Type from "./Modal_Order_Type";
import { Slide, toast } from "react-toastify";
import { Divider, MenuItem } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Region {
  name: string;
}
interface Province {
  id: number;
  name: string;
  region: Region;
}
interface City {
  name: string;
  province: Province;
}
interface Barangay {
  name: string;
  city: City;
}
interface baddress {
  name: string;
  barangay: Barangay;
  block_street: string;
}

interface customer {
  block_unit: string;
  barangay: Barangay;
}

interface locateAddress {
  id: number;
  name: string;
  city: City;
}

function toProperCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));
export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const [typeOrder, setTypeOrder] = useState({
    orderType: "",
  });

  const [ownerType, setOwnerType] = useState({
    ownerType: "",
  });

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const clients = useBranchListQuery({
    owner: account_detailed1.department.id,
  });
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const handleClose = () => {
    setCustomerData({
      ...customerData,
      customercode: "",
      customername: "",
      fname: "",
      lname: "",
      phone1: "",
      phone2: "",
      landline: "",
      email: "",
      block_unit: "",
      barangay: "",
      company: "",
      nearest_landmark: "",
    });
    setProductOrder([
      {
        id: 0,
        product: "",
        unitPrice: "",
        qty: "",
        discount: "",
        subtotal: "",
      },
    ]);
    setOpen(false);
  };

  const [orderType, setOrderType] = React.useState({
    demographic: "1",
    rt_type: "1",
    order_type: "1",
    call_type: "1",
    type_of_complaint: "0",
    reason_cancell: "0",
  });

  const [customerData, setCustomerData] = React.useState({
    customercode: "",
    customername: "",
    invoiceno: "",
    truck: "",
    tripno: "",
    fname: "",
    lname: "",
    phone1: "",
    phone2: "",
    landline: "",
    email: "",
    block_unit: "",
    barangay: "",
    company: "",
    nearest_landmark: "",
    expected_deldate: "",
    expected_deltime: "",
    sendsms: false,
    sendemail: false,
    branch: "",
  });

  const [productOrder, setProductOrder] = React.useState([
    {
      id: 0,
      product: "",
      unitPrice: "",
      qty: "",
      discount: "",
      subtotal: "",
    },
  ]);

  const [productOrderTotal, setProductOrderTotal] = React.useState({
    gsubtotal: "",
    gdelcharge: "",
    gdiscount: "",
    gtotal: "0.00",
  });

  const [others, setOthers] = React.useState({
    mopayment: "1",
    changefor: "",
    changeamount: "",
    special_instructions: "",
  });

  const [changeamt, setChangeamt] = useState<boolean>(true);

  useEffect(() => {
    const checkchange = parseFloat(others.changeamount);
    if (isNaN(checkchange) || checkchange < 0) {
      setChangeamt(true);
    } else {
      setChangeamt(false);
    }
  }, [others.changeamount]);

  const OrderDetails = {
    customercode: customerData.customercode,
    customername: customerData.customername,
    invoiceno: customerData.invoiceno,
    truck: customerData.truck,
    tripno: customerData.tripno,
    fname: customerData.fname,
    lname: customerData.lname,
    phone1: customerData.phone1,
    phone2: customerData.phone2,
    landline: customerData.landline,
    email: customerData.email,
    block_unit: customerData.block_unit,
    barangay: customerData.barangay,
    company: customerData.company,
    nearest_landmark: customerData.nearest_landmark,
    expected_deldate: customerData.expected_deldate,
    expected_deltime: customerData.expected_deltime,
    sendsms: customerData.sendsms,
    sendemail: customerData.sendemail,
    branch: customerData.branch,
    added_by: account_detailed1.id,
    department: account_detailed1.department.id,

    demographic: orderType.demographic,
    rt_type: orderType.rt_type,
    order_type: orderType.order_type,
    call_type: orderType.call_type,
    type_of_complaint: orderType.type_of_complaint,
    reason_cancell: orderType.reason_cancell,

    gsubtotal: productOrderTotal.gsubtotal,
    gdelcharge: productOrderTotal.gdelcharge,
    gdiscount: productOrderTotal.gdiscount,
    gtotal: productOrderTotal.gtotal,

    mopayment: others.mopayment,
    changefor: others.changefor,
    changeamount: others.changeamount,
    special_instructions: others.special_instructions,

    productOrder: productOrder,
  };

  const [addOrder] = useCreateOrderMutation();
  const saveOrder = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await addOrder(OrderDetails).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Added!", {
          transition: Slide,
        });

        setOrderType({
          demographic: "1",
          rt_type: "",
          order_type: "1",
          call_type: "1",
          type_of_complaint: "0",
          reason_cancell: "0",
        });

        setCustomerData({
          customercode: "",
          customername: "",
          invoiceno: "",
          truck: "",
          tripno: "",
          fname: "",
          lname: "",
          phone1: "",
          phone2: "",
          landline: "",
          email: "",
          block_unit: "",
          barangay: "",
          company: "",
          nearest_landmark: "",
          expected_deldate: "",
          expected_deltime: "",
          sendsms: true,
          sendemail: true,
          branch: "",
        });

        setProductOrder([
          {
            id: 0,
            product: "",
            unitPrice: "",
            qty: "",
            discount: "",
            subtotal: "",
          },
        ]);

        setProductOrderTotal({
          gsubtotal: "",
          gdelcharge: "",
          gdiscount: "",
          gtotal: "0.00",
        });

        setOthers({
          mopayment: "1",
          changefor: "",
          changeamount: "",
          special_instructions: "",
        });

        handleClose();
      } else {
        alert("something wrong");
      }
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const [baddress, setBaddress] = useState<baddress>({
    name: "",
    block_street: "",
    barangay: {
      name: "",
      city: {
        name: "",
        province: {
          id: 0,
          name: "",
          region: {
            name: "",
          },
        },
      },
    },
  });
  const { data: dbaddress, isSuccess: isdbaddressSuccess } = useViewBranchQuery(
    OrderDetails.branch === "" ? "0" : OrderDetails.branch
  );

  useEffect(() => {
    if (isdbaddressSuccess && dbaddress) {
      setBaddress({
        name: dbaddress.data.name,
        block_street: dbaddress.data.block_street,
        barangay: {
          name: dbaddress.data.barangay.name,
          city: {
            name: dbaddress.data.barangay.city.name,
            province: {
              id: dbaddress.data.barangay.city.province.id,
              name: dbaddress.data.barangay.city.province.name,
              region: {
                name: dbaddress.data.barangay.city.province.region.name,
              },
            },
          },
        },
      });
      // console.log(dbaddress.data);
    }
  }, [isdbaddressSuccess, dbaddress]);

  const [customerInfo, setCustomerInfo] = useState<locateAddress>({
    id: 0,
    name: "",
    city: {
      name: "",
      province: {
        id: 0,
        name: "",
        region: {
          name: "",
        },
      },
    },
  });
  const { data: custInfo, isSuccess: isCustInfoSuccess } =
    useLocateAddressQuery({
      barangay_id: OrderDetails.barangay === "" ? "0" : OrderDetails.barangay,
    });

  useEffect(() => {
    if (isCustInfoSuccess && custInfo) {
      setCustomerInfo(custInfo.data);
      // console.log("Customer Info", custInfo.data);
    }
  }, [isCustInfoSuccess, custInfo]);

  const locateAddress = () => {
    let customerProvince = "";
    if (
      customerInfo.city.province.id < 86 &&
      customerInfo.city.province.id > 81
    ) {
      customerProvince = "NCR";
    } else {
      customerProvince = customerInfo.city.province.name;
    }

    let branchProvince = "";
    if (
      baddress.barangay.city.province.id < 86 &&
      baddress.barangay.city.province.id > 81
    ) {
      branchProvince = "NCR";
    } else {
      branchProvince = baddress.barangay.city.province.name;
    }

    let customerAddress =
      OrderDetails.block_unit +
      ", " +
      customerInfo.name +
      ", " +
      customerInfo.city.name +
      ", " +
      customerProvince;

    let branchAddress =
      baddress.block_street +
      ", " +
      baddress.barangay.name +
      ", " +
      baddress.barangay.city.name +
      ", " +
      branchProvince;

    if (customerAddress === ", , , ") {
      toast.warning("Customer Not Found!", {
        transition: Slide,
      });
    }
    if (branchAddress === ", , , ") {
      toast.warning("Branch is not selected!", {
        transition: Slide,
      });
    }
    if (customerAddress !== ", , , " && branchAddress !== ", , , ") {
      window.open(
        "https://www.google.com/maps/dir/?api=1&origin=" +
          customerAddress +
          "&destination=" +
          branchAddress,
        "_blank"
      );
    }
  };

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const checkhandle = (e: any) => {
    const { name, value, type, checked } = e.target;
    alert(name);
  };

  return (
    <React.Fragment>
      {/* <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        disabled={getRolesAPI.data?.data.order.create === true ? false : true}
      >
        Create New Order
      </Button> */}

      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Create New Order
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openDropdown}
        onClose={handleCloseDropdown}
      >
        <MenuItem
          onClick={() => {
            setTypeOrder({
              ...orderType,
              orderType: "1",
            });
            setOwnerType({
              ...ownerType,
              ownerType: "1",
            });
            setOpen(true);
            handleCloseDropdown();
          }}
          disableRipple
        >
          <AddIcon />
          Hatid Bahay
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setTypeOrder({
              ...orderType,
              orderType: "2",
            });
            setOwnerType({
              ...ownerType,
              ownerType: "2",
            });
            setOpen(true);
            handleCloseDropdown();
          }}
          disableRipple
        >
          <AddIcon />
          Road Transport
        </MenuItem>
      </StyledMenu>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex">
            <div className="w-1/3">Create Order</div>
            <div className="w-2/3 flex justify-end pr-10">
              <div className="flex gap-3">
                <Button
                  component="label"
                  variant="contained"
                  className="w-36 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                  onClick={locateAddress}
                >
                  <span className="">Locate Address</span>
                </Button>
              </div>
            </div>
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
          <Modal_Order_Type
            orderType={orderType}
            setOrderType={setOrderType}
            ownerType={ownerType}
          />

          <hr className="mt-3" />
          <CustomerInformation
            customerData={customerData}
            setCustomerData={setCustomerData}
            orderType={typeOrder}
          />

          <hr className="mt-3" />
          <ProductOrder
            branch={customerData.branch}
            productOrder={productOrder}
            setProductOrder={setProductOrder}
            productOrderTotal={productOrderTotal}
            setProductOrderTotal={setProductOrderTotal}
          />

          <hr className="mt-5" />
          <Others
            others={others}
            setOthers={setOthers}
            totalamt={productOrderTotal.gtotal}
          />

          <div className="flex justify-center gap-5 py-10"></div>
        </DialogContent>

        <DialogActions>
          <div className="w-full flex gap-10 justify-center py-2">
            <Button
              component="label"
              variant="contained"
              className="w-52 pt-2"
              tabIndex={-1}
              size="small"
              color="primary"
              onClick={saveOrder}
              disabled={changeamt}
            >
              <span className="">Send to Scheduler</span>
            </Button>
            <Button
              component="label"
              variant="contained"
              className="w-52 pt-2"
              tabIndex={-1}
              size="small"
              color="info"
              onClick={handleClose}
            >
              <span className="">Close</span>
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
