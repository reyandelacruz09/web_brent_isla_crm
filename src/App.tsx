import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login_Form";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Branch from "./pages/Branch";
import OrderHistory from "./pages/OrderHistory";
import Inventory from "./pages/Inventory";
import User from "./pages/User";
import Modal_Create_Order from "./components/order/Modal_Create_Order";
import CustomerDetails from "./components/order/CustomerDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Products />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/user" element={<User />} />
          <Route path="/modal" element={<Modal_Create_Order />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
