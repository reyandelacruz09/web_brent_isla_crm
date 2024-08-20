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
  useCreateProductMutation,
  useClientListQuery,
  useBranchListQuery,
  useCategoryListQuery,
} from "../../store";
import { Slide, toast } from "react-toastify";

export interface Client {
  id: number;
  name: string;
}

export interface PCategory {
  id: string;
  name: string;
  code: string;
  branch: string;
}

function AddProduct() {
  const [product, setProduct] = useState({
    client: "",
    owner: "",
    category: "",
    code: "",
    name: "",
    active: true,
    price: "",
    discount: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    owner: false,
    category: false,
    code: false,
    name: false,
    price: false,
    discount: false,
    description: false,
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const validateFields = () => {
    const errors = {
      owner: !product.owner,
      category: !product.category,
      code: !product.code,
      name: !product.name,
      price: !product.price,
      discount: !product.discount,
      description: !product.description,
    };
    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error === true);
  };

  const [addPost] = useCreateProductMutation();

  const saveProduct = async (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all required fields.", {
        transition: Slide,
      });
      return;
    }

    const data1 = {
      client: product.client,
      owner: product.owner,
      category: product.category,
      code: product.code,
      name: product.name,
      active: product.active ? 1 : 2,
      price: product.price,
      discount: product.discount,
      description: product.description,
    };

    try {
      const checkstat = await addPost(data1).unwrap();
      if (checkstat.success === true) {
        toast.success("Successfully Added!", {
          transition: Slide,
        });
        setProduct({
          client: "",
          owner: "",
          category: "",
          code: "",
          name: "",
          active: true,
          price: "",
          discount: "",
          description: "",
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

  const clearProduct = async (e: any) => {
    e.preventDefault();
    setProduct({
      client: "",
      owner: "",
      category: "",
      code: "",
      name: "",
      active: true,
      price: "",
      discount: "",
      description: "",
    });
  };

  const clients = useBranchListQuery("");
  const [content, setContent] = useState<Client[]>([]);
  useEffect(() => {
    if (clients.isSuccess) {
      const result = clients.data?.data || [];
      setContent(result);
    }
  }, [clients.isSuccess, clients.data]);

  const productcategory = useCategoryListQuery("");
  const [listCategory, setListCategory] = useState<PCategory[]>([]);
  useEffect(() => {
    if (productcategory.isSuccess) {
      const category_result =
        ((productcategory.data as any).data as PCategory[]) || [];
      setListCategory(category_result);
    }
  }, [productcategory.isSuccess, productcategory.data]);

  // console.warn(listCategory);

  return (
    <>
      <form onSubmit={saveProduct}>
        <div className="w-full pt-5">
          <div className="flex justify-center pt-5">
            <div className="w-5/6 flex ">
              <div className="w-1/3">
                <span className="text-2xl font-bold">Create Product</span>
              </div>
              <div className="w-2/3 flex gap-4 justify-end">
                <Button
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="inherit"
                  onClick={clearProduct}
                >
                  <span className="">Clear</span>
                </Button>
                {/* <Button
                  onClick={saveProduct}
                  component="label"
                  variant="contained"
                  className="w-40 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save and Close</span>
                </Button> */}
                <Button
                  onClick={saveProduct}
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save</span>
                </Button>
                {/* <input type="submit" value="Submit Button" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="w-5/6 p-5 border">
            <div className="grid grid-cols-3 mt-4">
              <div className="col-span-3 mt-3">
                <span className="text-lg font-bold">
                  <KeyboardAltOutlinedIcon className="align-top" /> Product
                  Information
                </span>
              </div>

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Owner
                </label>
                <div className="relative mb-6">
                  <select
                    name="owner"
                    value={product.owner || ""}
                    onChange={handleInput}
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.owner
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  >
                    <option value="" disabled>
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

              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Category
                </label>
                <div className="relative mb-6">
                  <select
                    name="category"
                    value={product.category || ""}
                    onChange={handleInput}
                    id="rec_mode"
                    className={`bg-gray-50 border ${
                      validationErrors.category
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  >
                    <option value="" disabled>
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
              <div className="pt-3 mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Code
                </label>
                <div className="relative mb-6 ">
                  <input
                    type="text"
                    id="input-group-1"
                    name="code"
                    value={product.code}
                    onChange={handleInput}
                    className={`bg-gray-50 border ${
                      validationErrors.code
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Name
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="input-group-1"
                    name="name"
                    value={product.name}
                    onChange={handleInput}
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
                        checked={product.active}
                        onChange={handleInput}
                        name="active"
                      />
                    }
                    label="Active"
                  />
                </div>
              </div>
              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Unit Price
                </label>
                <div className="relative mb-6">
                  <input
                    type="number"
                    id="input-group-1"
                    name="price"
                    value={product.price}
                    onChange={handleInput}
                    className={`bg-gray-50 border ${
                      validationErrors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Discount
                </label>
                <div className="relative mb-6">
                  <input
                    type="number"
                    id="input-group-1"
                    name="discount"
                    value={product.discount}
                    onChange={handleInput}
                    className={`bg-gray-50 border ${
                      validationErrors.discount
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  />
                </div>
              </div>

              <div className="mr-5">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Product Description
                </label>
                <div className="relative mb-6 ">
                  <textarea
                    id="input-group-1"
                    name="description"
                    value={product.description}
                    onChange={handleInput}
                    className={`bg-gray-50 border ${
                      validationErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5`}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
