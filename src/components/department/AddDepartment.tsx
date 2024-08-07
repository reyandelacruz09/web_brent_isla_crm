import { Button, Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  useClientCategoryListQuery,
  useCreateClientMutation,
  useBranchListQuery,
  useCategoryListQuery,
} from "../../store";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ClientCategory {
  id: number;
  name: string;
}

export interface PCategory {
  id: string;
  name: string;
  code: string;
  branch: string;
}

function AddDepartment() {
  const [client, setClient] = useState({
    code: "",
    name: "",
    status: true,
    category: "",
    start_date: "",
    end_date: "",
    head: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setClient({ ...client, [name]: type === "checkbox" ? checked : value });
  };

  const [addClient] = useCreateClientMutation();

  const saveClient = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await addClient(client).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Added!", {
          transition: Slide,
        });

        setClient({
          code: "",
          name: "",
          status: true,
          category: "",
          start_date: "",
          end_date: "",
          head: "",
        });
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        alert("something wrong");
      }
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const productcategory = useClientCategoryListQuery("");
  const [listCategory, setListCategory] = useState<ClientCategory[]>([]);
  useEffect(() => {
    if (productcategory.isSuccess) {
      const category_result =
        ((productcategory.data as any).data as ClientCategory[]) || [];
      setListCategory(category_result);
    }
  }, [productcategory.isSuccess, productcategory.data]);

  return (
    <>
      <form>
        <div className="w-full pt-5">
          <div className="flex justify-center pt-5">
            <div className="w-5/6 flex ">
              <div className="w-1/3">
                <span className="text-2xl font-bold">Add Department</span>
              </div>
              <div className="w-2/3 flex gap-4 justify-end">
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="inherit"
                >
                  <span className="">Cancel</span>
                </Button>
                <Button
                  onClick={saveClient}
                  component="label"
                  variant="contained"
                  className="w-40 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save and Close</span>
                </Button>
                <Button
                  onClick={saveClient}
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save and New</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="w-5/6 p-5 border">
            <div className="grid grid-cols-3 mt-4">
              <div className="col-span-3 mt-3">
                <span className="text-lg font-bold">
                  <KeyboardAltOutlinedIcon className="align-top" /> Department
                  Information
                </span>
              </div>

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Department Code
                </label>
                <div className="relative mb-6">
                  <input
                    name="code"
                    id="rec_mode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Department Name
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="name"
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
                  />
                  <FormControlLabel
                    className="absolute top-0 right-0"
                    control={
                      <Checkbox
                        onChange={handleInput}
                        defaultChecked
                        name="status"
                      />
                    }
                    label="Active"
                  />
                </div>
              </div>

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <div className="relative mb-6">
                  <select
                    name="category"
                    onChange={handleInput}
                    id="rec_mode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  >
                    <option value="" selected>
                      Choose One
                    </option>
                    {listCategory.map((listcate: any) => (
                      <option key={listcate.id} value={listcate.id}>
                        {listcate.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Start Date
                </label>
                <div className="relative mb-6 ">
                  <input
                    type="date"
                    id="input-group-1"
                    name="start_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  End Date
                </label>
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="input-group-1"
                    name="end_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Department Head
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="head"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddDepartment;
