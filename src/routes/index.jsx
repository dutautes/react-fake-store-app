import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Users from "../pages/Users";
import ProductCategory from "../pages/ProductCategory";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Template from "../Template";
import { auth } from '../middleware/auth';

// membuat daftar routing
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // mengisi <Outlet /> di Template.jsx
        children: [
            { path: "/", element: <App /> },
            { path: "/products", element: <Products />},
            { path: "/users", element: <Users />},
            { path: "/category/:categoryId", element: <ProductCategory />},
            { path: "/login", element: <Login />},
        ]
    },
    {
        path: "/",
        element: <Template />,
        loader: auth, // menjalankan fungsi ketika proses perpindahan halaman, menjalankan pengecekan middleware/auth.js baru meneruskan halaman
        // mengisi <Outlet /> di Template.jsx
        children: [
            { path: "/cart", element: <Cart />},
            { path: "/checkout", element: <Checkout />},
        ]
    }
]);