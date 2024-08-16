import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import "../../App.css";
import { useOrderViewQuery, useOrderGetStatusQuery } from "../../store";
import { useEffect, useState } from "react";
import Date_Format from "./Date_Format";

interface cust_idProps {
  orderID: string;
}

interface order {
  id: string;
  status: string;
}
interface status {
  id: string;
  orderID: string;
  status: string;
  date_created: string;
  date_accepted: string;
  date_dispatched: string;
  date_completed: string;
  date_canceled: string;
}
function CustomerDetails_R2({ orderID }: cust_idProps) {
  const [orderDetails, setOrderDetails] = useState<order[]>([]);
  const [orderStatus, setOrderStatus] = useState<status[]>([]);
  const { data: order, isSuccess: isOrderSuccess } = useOrderViewQuery(
    orderID || ""
  );
  const { data: orderStat, isSuccess: isOrderStatSuccess } =
    useOrderGetStatusQuery(orderID || "");
  const [style, setStyle] = useState({
    created:
      "border-dashed border-2 border-slate-300 relative -top-4 w-1/2 -z-10",
    acceptL:
      "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
    acceptR:
      "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
    dispatchL:
      "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
    dispatchR:
      "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
    completeL:
      "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
    cancel: "",
    createdIcon: "text-white bg-slate-300 p-3 rounded-full",
    acceptIcon: "text-white bg-slate-300 p-3 rounded-full",
    dispatchIcon: "text-white bg-slate-300 p-3 rounded-full",
    completeIcon: "text-white bg-slate-300 p-3 rounded-full",
    cancelIcon: "text-white bg-slate-300 p-3 rounded-full",
    date_created: "\xa0",
    date_accepted: "\xa0",
    date_dispatched: "\xa0",
    date_completed: "\xa0",
    date_canceled: "\xa0",
  });

  useEffect(() => {
    if (isOrderSuccess && order) {
      setOrderDetails(order.data);
    }
  }, [isOrderSuccess, order]);

  useEffect(() => {
    if (isOrderStatSuccess && orderStat) {
      setOrderStatus(orderStat.data);
    }
  }, [isOrderStatSuccess, orderStat]);

  // console.warn(orderStatus);

  useEffect(() => {
    if (orderStatus.length > 0) {
      setStyle((prev) => ({
        ...prev,
        date_created: orderStatus[0]?.date_created ?? "\xa0",
        date_accepted: orderStatus[1]?.date_accepted ?? "\xa0",
        date_dispatched: orderStatus[2]?.date_dispatched ?? "\xa0",
        date_completed: orderStatus[3]?.date_completed ?? "\xa0",
        date_canceled: orderStatus[4]?.date_canceled ?? "\xa0",
      }));
    }
  }, [orderStatus]);

  useEffect(() => {
    // console.warn("length", orderDetails.length);
    if (orderDetails.length > 0) {
      // console.warn("Order Status", orderDetails[0].status);
      if (orderDetails[0].status == "1") {
        setStyle((prev) => ({
          ...prev,
          created:
            "border-dashed border-2 border-slate-300 relative -top-4 w-1/2 -z-10",
          acceptL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          acceptR:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          dispatchL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          dispatchR:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          completeL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          createdIcon: "text-white bg-orange-500 p-3 rounded-full",
          acceptIcon: "text-white bg-slate-300 p-3 rounded-full",
          dispatchIcon: "text-white bg-slate-300 p-3 rounded-full",
          completeIcon: "text-white bg-slate-300 p-3 rounded-full",
          cancelIcon: "text-white bg-slate-300 p-3 rounded-full",
        }));
      } else if (orderDetails[0].status == "2") {
        setStyle((prev) => ({
          ...prev,
          created:
            "border-dashed border-2 border-slate-500 relative -top-4 w-1/2 -z-10",
          acceptL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          acceptR:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          dispatchL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          dispatchR:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          completeL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          createdIcon: "text-white bg-orange-500 p-3 rounded-full",
          acceptIcon: "text-white bg-blue-500 p-3 rounded-full",
          dispatchIcon: "text-white bg-slate-300 p-3 rounded-full",
          completeIcon: "text-white bg-slate-300 p-3 rounded-full",
          cancelIcon: "text-white bg-slate-300 p-3 rounded-full",
        }));
      } else if (orderDetails[0].status == "3") {
        setStyle((prev) => ({
          ...prev,
          created:
            "border-dashed border-2 border-slate-500 relative -top-4 w-1/2 -z-10",
          acceptL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          acceptR:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          dispatchL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          dispatchR:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          completeL:
            "border-dashed border-2 border-slate-300 relative -top-4 -z-10 ml-1",
          createdIcon: "text-white bg-orange-500 p-3 rounded-full",
          acceptIcon: "text-white bg-blue-500 p-3 rounded-full",
          dispatchIcon: "text-white bg-purple-500 p-3 rounded-full",
          completeIcon: "text-white bg-slate-300 p-3 rounded-full",
          cancelIcon: "text-white bg-slate-300 p-3 rounded-full",
        }));
      } else if (orderDetails[0].status == "4") {
        setStyle((prev) => ({
          ...prev,
          created:
            "border-dashed border-2 border-slate-500 relative -top-4 w-1/2 -z-10",
          acceptL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          acceptR:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          dispatchL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          dispatchR:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          completeL:
            "border-dashed border-2 border-slate-500 relative -top-4 -z-10 ml-1",
          createdIcon: "text-white bg-orange-500 p-3 rounded-full",
          acceptIcon: "text-white bg-blue-500 p-3 rounded-full",
          dispatchIcon: "text-white bg-purple-500 p-3 rounded-full",
          completeIcon: "text-white bg-green-500 p-3 rounded-full",
          cancelIcon: "text-white bg-slate-300 p-3 rounded-full",
        }));
      }
    }
  }, [orderDetails]);
  return (
    <>
      <div className="pt-3">
        <div className="p-3">
          <div className="pb-3">
            <span className="font-bold text-lg">Recent activity log</span>
          </div>

          <div className="bg-gray-200 h-52 w-4/4 flex relative justify-center items-center -z-20">
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className={style.createdIcon}>
                  <ExitToAppOutlinedIcon />
                </span>
                <div dir="rtl">
                  <div className={style.created}></div>
                </div>
              </div>
              <p className="font-bold">Order Created</p>
              <p className="text-xs">
                <Date_Format date_formatted={style.date_created} />
              </p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className={style.acceptIcon}>
                  <ArchiveOutlinedIcon />
                </span>
                <div className="flex">
                  <div dir="ltr" className="inline-block w-1/2">
                    <div className={style.acceptL}></div>
                  </div>
                  <div dir="rtl" className="inline-block w-1/2">
                    <div className={style.acceptR}></div>
                  </div>
                </div>
              </div>
              <p className="font-bold">Order Accepted</p>
              <p className="text-xs">
                <Date_Format date_formatted={style.date_accepted} />
              </p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className={style.dispatchIcon}>
                  <UnarchiveOutlinedIcon />
                </span>
                <div className="flex">
                  <div dir="ltr" className="inline-block w-1/2">
                    <div className={style.dispatchL}></div>
                  </div>
                  <div dir="rtl" className="inline-block w-1/2">
                    <div className={style.dispatchR}></div>
                  </div>
                </div>
              </div>
              <p className="font-bold">Order Dispatched</p>
              <p className="text-xs">
                <Date_Format date_formatted={style.date_dispatched} />
              </p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className={style.completeIcon}>
                  <ShoppingCartCheckoutOutlinedIcon />
                </span>
                <div className="flex">
                  <div dir="ltr" className="inline-block w-1/2">
                    <div className={style.completeL}></div>
                  </div>
                  <div dir="rtl" className="inline-block w-1/2">
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <p className="font-bold">Order Completed</p>
              <p className="text-xs">
                <Date_Format date_formatted={style.date_completed} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails_R2;
