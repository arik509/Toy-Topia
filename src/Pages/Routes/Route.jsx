import { createBrowserRouter } from "react-router";
import Home from "../../Layouts/Home";
import HomePage from "../../HomePage";
import AllToys from "../../AllToys";
import Login from "../../Login";
import Register from "../../Register";
import AuthLayout from "../../Layouts/AuthLayout";

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
      
    //   {
    //     path: "/category/:id",
    //     element: <CategoryNews></CategoryNews>,
    //     loader: () => fetch("/news.json"),
    //   },

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
    element: <h2>Error 404</h2>,
  },
]);

export default router;
