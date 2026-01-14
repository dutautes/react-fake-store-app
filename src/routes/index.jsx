import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// membuat daftar routing
export const router = createBrowserRouter([
    { path: "/", element: <App /> }
]);