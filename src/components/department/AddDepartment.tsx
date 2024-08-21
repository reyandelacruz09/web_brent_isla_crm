import { Button, Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { useEffect, useState } from "react";
import {
  useClientCategoryListQuery,
  useCreateClientMutation,
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
    contact_person: "",
    email: "",
    contract_term: "",
    no_licenses: "",
    plan_subscription: "",
    date_renewal: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    code: false,
    name: false,
    category: false,
    start_date: false,
    end_date: false,
    head: false,
    contact_person: false,
    email: false,
    contract_term: false,
    no_licenses: false,
    plan_subscription: false,
    date_renewal: false,
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setClient({ ...client, [name]: type === "checkbox" ? checked : value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const [addClient] = useCreateClientMutation();

  const validateFields = () => {
    const errors = {
      code: !client.code,
      name: !client.name,
      category: !client.category,
      start_date: !client.start_date,
      end_date: !client.end_date,
      head: !client.head,
      contact_person: !client.contact_person,
      email: !client.email,
      contract_term: !client.contract_term,
      no_licenses: !client.no_licenses,
      plan_subscription: !client.plan_subscription,
      date_renewal: !client.date_renewal,
    };
    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error === true);
  };

  const saveClient = async (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all required fields.", {
        transition: Slide,
      });
      return;
    }

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
          contact_person: "",
          email: "",
          contract_term: "",
          no_licenses: "",
          plan_subscription: "",
          date_renewal: "",
        });
      } else {
        alert("something wrong");
      }
    } catch (error) {
      toast.error("Something went wrong 🥺", {
        transition: Slide,
      });
    }
  };

  const clearClient = async (e: any) => {
    e.preventDefault();
    setClient({
      code: "",
      name: "",
      status: true,
      category: "",
      start_date: "",
      end_date: "",
      head: "",
      contact_person: "",
      email: "",
      contract_term: "",
      no_licenses: "",
      plan_subscription: "",
      date_renewal: "",
    });
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
                  onClick={clearClient}
                >
                  <span className="">Clear</span>
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
                  <span className="">Save</span>
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

              {/* <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Department Code
                </label>
                <div className="relative mb-6">
                  <input
                    name="code"
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.code
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    onChange={handleInput}
                    value={client.code}
                  />
                </div>
              </div> */}

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
                    value={client.name}
                    className={`bg-gray-50 border ${
                      validationErrors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
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
                  Contact Person
                </label>
                <div className="relative mb-6">
                  <input
                    name="contact_person"
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.contact_person
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.code}
                  />
                </div>
              </div>

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <div className="relative mb-6">
                  <input
                    name="email"
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.code}
                  />
                </div>
              </div>

              {/* <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <div className="relative mb-6">
                  <select
                    name="category"
                    onChange={handleInput}
                    value={client.category || ""}
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.category
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
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
              </div> */}

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Contract Term
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="contract_term"
                    className={`bg-gray-50 border ${
                      validationErrors.contract_term
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.head}
                  />
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
                    value={client.start_date}
                    className={`bg-gray-50 border ${
                      validationErrors.start_date
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
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
                    value={client.end_date}
                    className={`bg-gray-50 border ${
                      validationErrors.end_date
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  No of Licenses
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="no_licenses"
                    className={`bg-gray-50 border ${
                      validationErrors.no_licenses
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.head}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Plan Subscription
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="plan_subscription"
                    className={`bg-gray-50 border ${
                      validationErrors.plan_subscription
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.head}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Renewal
                </label>
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="input-group-1"
                    name="date_renewal"
                    className={`bg-gray-50 border ${
                      validationErrors.date_renewal
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                    // onChange={handleInput}
                    // value={client.head}
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
