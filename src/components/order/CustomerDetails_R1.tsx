import { Button } from "@mui/material";
import { useOrderViewQuery } from "../../store";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useOrderUpdateStatusMutation } from "../../store";
import { Slide, toast } from "react-toastify";

interface cust_idProps {
  orderID: string;
}

interface order {
  id: string;
  status: string;
}

function CustomerDetails_R1({ orderID }: cust_idProps) {
  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );
  const order_Detailed = JSON.parse(localStorage.getItem("view_id") || "{}");
  const [orderDetails, setOrderDetails] = useState<order[]>([]);
  const { data: order, isSuccess: isOrderSuccess } = useOrderViewQuery(
    orderID || order_Detailed
  );
  const [accept, setAccept] = useState<boolean>(true);
  const [dispatch, setDispatch] = useState<boolean>(true);
  const [complete, setComplete] = useState<boolean>(true);
  const [cancel, setCancel] = useState<boolean>(true);

  const [type, setType] = useState<string>("");

  const [open, setOpen] = useState(false);

  const [orderDet, setOrderDet] = useState({
    orderID: "",
    type: "",
    added_by: "",
  });

  const handleClickOpenAccept = () => {
    setType("Accept");
    setOrderDet((prevState) => ({
      ...prevState,
      orderID: orderID,
      type: "Accept",
      added_by: account_detailed1.id,
    }));
    setOpen(true);
  };
  const handleClickOpenDispatch = () => {
    setType("Dispatch");
    setOrderDet((prevState) => ({
      ...prevState,
      orderID: orderID,
      type: "Dispatch",
      added_by: account_detailed1.id,
    }));
    setOpen(true);
  };
  const handleClickOpenComplete = () => {
    setType("Complete");
    setOrderDet((prevState) => ({
      ...prevState,
      orderID: orderID,
      type: "Complete",
      added_by: account_detailed1.id,
    }));
    setOpen(true);
  };
  const handleClickOpenCancel = () => {
    setType("Cancel");
    setOrderDet((prevState) => ({
      ...prevState,
      orderID: orderID,
      type: "Cancel",
      added_by: account_detailed1.id,
    }));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOrderSuccess && order) {
      setOrderDetails(order.data);
    }
  }, [isOrderSuccess, order]);

  useEffect(() => {
    if (orderDetails.length > 0) {
      // console.warn("Order Status", orderDetails[0].status);
      if (orderDetails[0].status == "1") {
        setAccept(false);
        setDispatch(true);
        setComplete(true);
        setCancel(false);
      } else if (orderDetails[0].status == "2") {
        setAccept(true);
        setDispatch(false);
        setComplete(true);
        setCancel(false);
      } else if (orderDetails[0].status == "3") {
        setAccept(true);
        setDispatch(true);
        setComplete(false);
        setCancel(true);
      } else if (orderDetails[0].status == "4") {
        setAccept(true);
        setDispatch(true);
        setComplete(true);
        setCancel(true);
      } else if (orderDetails[0].status == "5") {
        setAccept(true);
        setDispatch(true);
        setComplete(true);
        setCancel(true);
      }
    }
  });

  const [upStatus] = useOrderUpdateStatusMutation();

  const submitdata = async (e: any) => {
    try {
      const checkstat = await upStatus(orderDet).unwrap();
      if (checkstat.success === true) {
        let newstat = "";
        if (orderDet.type === "Accept") {
          newstat = "Successfully Accepted";
        } else if (orderDet.type === "Dispatch") {
          newstat = "Successfully Dispatched";
        } else if (orderDet.type === "Complete") {
          newstat = "Successfully Completed";
        } else if (orderDet.type === "Cancel") {
          newstat = "Successfully Canceled";
        }
        toast.success(newstat, {
          transition: Slide,
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

  return (
    <>
      <div className="flex gap-4 pb-3 justify-end">
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="primary"
          disabled={accept}
          onClick={handleClickOpenAccept}
        >
          <span className="">Accept Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="secondary"
          disabled={dispatch}
          onClick={handleClickOpenDispatch}
        >
          <span className="">Dispatch Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="success"
          disabled={complete}
          onClick={handleClickOpenComplete}
        >
          <span className="">Complete Order</span>
        </Button>
        <Button
          component="label"
          variant="contained"
          className="w-40 pt-2"
          tabIndex={-1}
          size="small"
          color="error"
          disabled={cancel}
          onClick={handleClickOpenCancel}
        >
          <span className="">Cancel Order</span>
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to {type} this Order?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions className="">
          <div className="w-full flex pb-5">
            <div className="w-1/2 text-center">
              <Button
                className="w-5/6"
                variant="contained"
                color="success"
                onClick={submitdata}
              >
                Yes
              </Button>
            </div>
            <div className="w-1/2 text-center">
              <Button
                className="w-5/6"
                variant="contained"
                color="primary"
                onClick={handleClose}
                autoFocus
              >
                No
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerDetails_R1;
