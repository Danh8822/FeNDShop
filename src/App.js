import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSucess from './components/CheckoutSuccess';
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ShopCategory from './components/Shopcategory/ShopCategory';
import ProductsList from './components/admin/list/ProductsList';
import Product from './components/Details/Product'
import Order from './components/Details/Order'
import UserProfile from './components/Details/UserProfile';
import Profile from './components/profile/Profile';
import Dashboard1 from "./components/profile/Dashboard1";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/iphone' element={<ShopCategory brand="iphone" />} />
            <Route path='/samsung' element={<ShopCategory brand="samsung" />} />
            <Route path='/realme' element={<ShopCategory brand="realme" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSucess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="summary" element={<Summary />} />
              <Route path="products" element={<Products />}>
                <Route index element={<ProductsList />} />
                <Route path="create-product" element={<CreateProduct />} />
              </Route>
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/profile" element={<Dashboard1 />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
        <FooterControlled />
      </BrowserRouter>
    </div>
  );
}

function FooterControlled() {
  const location = useLocation();
  // Kiểm tra xem trang hiện tại có phải là trang admin không
  const isAdminPage = location.pathname.startsWith("/admin");
  const isProfilePage = location.pathname.startsWith("/profile");
  // Nếu là trang admin, không hiển thị Footer
  if (isAdminPage || isProfilePage) {
    return null;
  }
  return <Footer />;
}

export default App;
