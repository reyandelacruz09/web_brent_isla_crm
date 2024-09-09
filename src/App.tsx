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
import Testing_Only from "./components/order/Testing";
import Department from "./pages/Department";
import KB from "./pages/KB";
import { ToastContainer } from "react-toastify";
import Settings from "./pages/Settings";
import Profiles from "./components/settings/Profiles";
import Roles_Access from "./components/settings/Roles_Access";
import Modal_Create_Profile from "./components/settings/Modal_Create_Profile";
import Roles_and_Sharing from "./components/settings/Roles_and_Sharing";
import Telephony from "./components/settings/Telephony";
import Restricted from "./pages/Restricted";
import Ticketing from "./components/settings/ticketing";
import SMS from "./components/settings/SMS";
import Login_Form_2 from "./components/Login_Form_2";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
          <Route path="/department" element={<Department />} />
          <Route path="/kb" element={<KB />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<Profiles />} />
          <Route path="/settings/roles" element={<Roles_and_Sharing />} />
          <Route path="/login2" element={<Login_Form_2 />} />

          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/sms" element={<SMS />} />
          <Route path="/telephony" element={<Telephony />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
