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
import { useCreateProductMutation, useClientListQuery } from "../../store";
import AllProducts from "./AllProducts";

export interface Client {
  id: number;
  name: string;
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
    description: "",
  });

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const [addPost] = useCreateProductMutation();

  const saveProduct = async (e: any) => {
    e.preventDefault();

    const data1 = {
      client: 2,
      owner: product.owner,
      category: 2,
      code: product.code,
      name: product.name,
      active: product.active ? 1 : 0,
      price: product.price,
      description: product.description,
    };

    try {
      const checkstat = await addPost(data1).unwrap();
      if (checkstat.success === true) {
        alert("success");
        {
          // setProduct({
          //   client: "",
          //   owner: "",
          //   category: "",
          //   code: "",
          //   name: "",
          //   active: true,
          //   price: "",
          //   description: "",
          // });
          // window.location.reload();
        }
      } else {
        alert("something wrong");
      }
    } catch (error) {
      alert("Hala");
    }
  };

  const { data: clients, error, isLoading, isSuccess } = useClientListQuery("");
  const [content, setContent] = useState<Client[]>([]);

  useEffect(() => {
    if (isSuccess) {
      let result: any = [];
      let content: any = [];
      result = clients;

      const size = Object.keys(result.data).length;
      const client: Client[] = [];

      for (let i = 0; i < size; i++) {
        client.push({
          id: result.data[i].id,
          name: result.data[i].name,
        });
      }

      setContent(client);
    }
  }, [clients, isSuccess]);

  //console.log(content);

  const listOptions = content;

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
                >
                  <span className="">Cancel</span>
                </Button>
                <Button
                  onClick={saveProduct}
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
                  onClick={saveProduct}
                  component="label"
                  variant="contained"
                  className="w-32 pt-2"
                  tabIndex={-1}
                  size="small"
                  color="primary"
                >
                  <span className="">Save and New</span>
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
                    value={product.owner}
                    onChange={handleInput}
                    id="rec_mode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  >
                    <option value="" disabled>
                      Choose One
                    </option>
                    {listOptions.map((listOption) => (
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
                  <input
                    type="text"
                    id="input-group-1"
                    name="category"
                    value={product.category}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder=""
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
