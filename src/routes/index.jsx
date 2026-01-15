import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Users from "../pages/Users";
import ProductCategory from "../pages/ProductCategory";
import Template from "../Template";

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
            { path: "/category/:categoryId", element: <ProductCategory />}
        ]
    }
]);