import { Button, Checkbox, FormControlLabel } from "@mui/material";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import {
  useBranchListQuery,
  useClientListQuery,
  useGetRolesQuery,
} from "../../store";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "../../store";
import { Slide, toast } from "react-toastify";

interface Client {
  id: number;
  name: string;
}
interface Department {
  id: number;
  name: string;
}

function AddUser() {
  const clients = useBranchListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const depList = useClientListQuery("");
  const [clientList, setClientList] = useState<Department[]>([]);
  useEffect(() => {
    if (depList.isSuccess) {
      const category_result =
        ((depList.data as any).data as Department[]) || [];
      setClientList(category_result);
    }
  }, [depList.isSuccess, depList.data]);

  const [user, setUser] = useState({
    code: "",
    email: "",
    status: true,
    password: "",
    cpassword: "",
    fullname: "",
    phone: "",
    role: 0,
    department: 0,
    branch: 0,
  });

  const [validationErrors, setValidationErrors] = useState({
    code: false,
    email: false,
    password: false,
    cpassword: false,
    fullname: false,
    phone: false,
    role: false,
    department: false,
    branch: false,
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const validateFields = () => {
    const errors = {
      code: !user.code,
      email: !user.email,
      password: !user.password,
      cpassword: !user.cpassword,
      fullname: !user.fullname,
      phone: !user.phone,
      role: !user.role,
      department: !user.department,
      branch: !user.branch,
    };
    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error === true);
  };

  const [addUser] = useCreateUserMutation();

  const saveUser = async (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all required fields.", {
        transition: Slide,
      });
      return;
    }

    const data1 = {
      code: user.code,
      email: user.email,
      status: user.status,
      password: user.password,
      cpassword: user.cpassword,
      fullname: user.fullname,
      phone: user.phone,
      role: user.role,
      department: user.department,
      branch: user.branch,
    };

    try {
      const checkstat = await addUser(data1).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Added!", {
          transition: Slide,
        });
        setUser({
          code: "",
          email: "",
          status: true,
          password: "",
          cpassword: "",
          fullname: "",
          phone: "",
          role: 0,
          department: 0,
          branch: 0,
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

  const clearUser = async (e: any) => {
    e.preventDefault();
    setUser({
      code: "",
      email: "",
      status: true,
      password: "",
      cpassword: "",
      fullname: "",
      phone: "",
      role: 0,
      department: 0,
      branch: 0,
    });
  };

  const account_detailed1 = JSON.parse(
    localStorage.getItem("account_detail") || "{}"
  );

  const getRolesAPI = useGetRolesQuery({
    client: account_detailed1.department?.id || 0,
    role: account_detailed1.role || 0,
  });
  return (
    <>
      <div className="w-full pt-5">
        <div className="flex justify-center pt-5">
          <div className="w-5/6 flex ">
            <div className="w-1/3">
              <span className="text-2xl font-bold">Add User</span>
            </div>
            <div className="w-2/3 flex gap-4 justify-end">
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="inherit"
                onClick={clearUser}
              >
                <span className="">Clear</span>
              </Button>
              <Button
                component="label"
                variant="contained"
                className="w-32 pt-2"
                tabIndex={-1}
                size="small"
                color="primary"
                onClick={saveUser}
                disabled={
                  getRolesAPI.data?.data.user.create === true ? false : true
                }
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
                <KeyboardAltOutlinedIcon className="align-top" /> User
                Information
              </span>
            </div>

            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Code
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.code ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="code"
                  value={user.code}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Fullname
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.fullname
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="fullname"
                  value={user.fullname}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="pt-3 mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                />
                <FormControlLabel
                  className="absolute top-0 right-0"
                  control={
                    <Checkbox
                      name="status"
                      value={user.status}
                      onChange={handleInput}
                      defaultChecked
                    />
                  }
                  label="Active"
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <div className="relative mb-6 ">
                <input
                  type="text"
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.cpassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>
              <div className="relative mb-6 ">
                <select
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.role ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="role"
                  value={user.role}
                  onChange={handleInput}
                >
                  <option value="0" selected disabled>
                    Choose One
                  </option>
                  <option value="3">Admin</option>
                  <option value="2">Supervisor</option>
                  <option value="1">Agent</option>
                </select>
              </div>
            </div>

            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Department
              </label>
              <div className="relative mb-6">
                <select
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.department
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="department"
                  value={user.department}
                  onChange={handleInput}
                >
                  <option value="0" disabled selected>
                    Choose One
                  </option>
                  {clientList.map((ClientList: any) => (
                    <option key={ClientList.id} value={ClientList.id}>
                      {ClientList.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mr-5">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Branch
              </label>
              <div className="relative mb-6">
                <select
                  id="input-group-1"
                  className={`bg-gray-50 border ${
                    validationErrors.branch
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  name="branch"
                  value={user.branch}
                  onChange={handleInput}
                >
                  <option value="0" disabled selected>
                    Choose One
                  </option>
                  {content.map((listOption: any) => (
                    <option key={listOption.id} value={listOption.id}>
                      {listOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
