import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import "../../App.css";

function CustomerDetails_R2() {
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
                <span className="text-white bg-orange-500 p-3 rounded-full">
                  <ExitToAppOutlinedIcon />
                </span>
                <div dir="rtl">
                  <div className="border-dashed border-2 border-slate-500 relative -top-4 w-1/2 -z-10"></div>
                </div>
              </div>
              <p className="font-bold">Order Created</p>
              <p className="text-xs">14:30 - Sep 28, 2022</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className="text-white bg-blue-500 p-3 rounded-full">
                  <ArchiveOutlinedIcon />
                </span>
                <div dir="ltr">
                  <div className="border-dashed border-2 border-slate-500 relative -top-4 w-full -z-10 ml-1"></div>
                </div>
              </div>
              <p className="font-bold">Order Accepted</p>
              <p className="text-xs">14:32 - Sep 28, 2022</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className="text-white bg-purple-500 p-3 rounded-full">
                  <UnarchiveOutlinedIcon />
                </span>
                <div dir="ltr">
                  <div className="border-dashed border-2 border-slate-500 relative -top-4 w-full -z-10"></div>
                </div>
              </div>
              <p className="font-bold">Order Dispatched</p>
              <p className="text-xs">14:50 - Sep 28, 2022</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="pb-14">
                <span className="text-white bg-green-500 p-3 rounded-full">
                  <ShoppingCartCheckoutOutlinedIcon />
                </span>
                <div dir="ltr">
                  <div className="border-dashed border-2 border-slate-300 relative -top-4 w-1/2 -z-10 ml-1"></div>
                </div>
              </div>
              <p className="font-bold">Order Completed</p>
              <p className="text-xs">15:00 - Sep 28, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails_R2;
