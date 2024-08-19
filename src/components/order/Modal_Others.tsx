import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCompleteOrderQuery } from "../../store";
import { useEffect, useState } from "react";

interface cust_idProps {
  orderID: string;
}
interface OrderTotal {
  mopayment: string;
  changefor: string;
  changeamount: string;
}
interface Others {
  special_instructions: string;
}
function Modal_Others({ orderID }: cust_idProps) {
  const [others1, setOthers1] = useState<Others>({
    special_instructions: "",
  });
  const [others, setOthers] = useState<OrderTotal>({
    mopayment: "",
    changefor: "",
    changeamount: "",
  });

  const { data: orderInfo, isSuccess: isorderInfoSuccess } =
    useCompleteOrderQuery(orderID || "");

  useEffect(() => {
    if (isorderInfoSuccess && orderInfo) {
      setOthers1(orderInfo.data);
      setOthers(orderInfo.data.order_total[0]);
    }
  }, [isorderInfoSuccess, orderInfo]);

  // console.warn("Datas: ", others);

  return (
    <>
      <div className="grid grid-cols-10 bg-gray-300">
        <div className="col-span-10 mt-3">
          <span className="text-lg font-bold pl-2">Others</span>
        </div>
        <div className="col-span-3 pl-5 pt-3">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <span className="text-md font-bold text-slate-900">
                Mode of Payment
              </span>
            </FormLabel>
            <div className="border-2 bg-white rounded-md px-2 mt-1">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="mopayment"
                value={others.mopayment}
              >
                <div className="w-1/3">
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={<span className="text-sm">Cash</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={<span className="text-sm">Gcash</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label={<span className="text-sm">PayMaya</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label={<span className="text-sm">Visa</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label={<span className="text-sm">Mastercard</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <FormControlLabel
                    value="6"
                    control={<Radio />}
                    label={<span className="text-sm">AMEX</span>}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </div>
              </RadioGroup>
            </div>
          </FormControl>
        </div>

        <div className="col-span-2 pl-5 pt-3">
          <FormLabel id="demo-row-radio-buttons-group-label">
            <span className="text-md font-bold text-slate-900">Change for</span>
          </FormLabel>
          <div className="relative mb-6 mt-1">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-3"
              name="changefor"
              value={parseFloat(others.changefor).toFixed(2)}
              disabled
            />
          </div>
        </div>

        <div className="col-span-2 pl-5 pt-3">
          <FormLabel id="demo-row-radio-buttons-group-label">
            <span className="text-md font-bold text-slate-900">
              Change Amount
            </span>
          </FormLabel>
          <div className="relative mb-6 mt-1">
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right pr-3"
              name="changeamount"
              value={parseFloat(others.changeamount).toFixed(2)}
              disabled
            />
          </div>
        </div>

        <div className="col-span-3 px-5 py-3">
          <FormLabel id="demo-row-radio-buttons-group-label">
            <span className="text-md font-bold text-slate-900">
              Special Instructions
            </span>
          </FormLabel>
          <div className="relative mb-6 mt-1">
            <textarea
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="special_instructions"
              value={others1.special_instructions}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal_Others;
