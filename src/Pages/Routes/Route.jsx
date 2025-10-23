import { createBrowserRouter } from "react-router";
import Home from "../../Layouts/Home";
import HomePage from "../../HomePage";
import AllToys from "../../AllToys";
import Login from "../../Login";
import Register from "../../Register";
import AuthLayout from "../../Layouts/AuthLayout";
import ToyDetails from "../../ToyDetails";
import Error from "../../Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "/products",
        Component: AllToys,
        loader:()=> fetch("/toys.json"), 
      },
      {
        path: "/products/:id",
        element: <ToyDetails></ToyDetails>,
        loader: () => fetch("/toys.json"),
      },

    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

export default router;
