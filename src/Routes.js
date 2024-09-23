import App from "./App";
import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AdminDashboard from "./admin/AdminDashboard";
import LoginPage from "./admin/LoginPage";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Landing />,
    exact: true,
  },
  {
    path: "/products",
    element: <ProductList />,
    exact: true,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    exact: true,
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
    exact: true,
  },
  {
    path: "*",
    element: <h1> An Error occurred</h1>, // Default error route
  },
];

export default routes;
