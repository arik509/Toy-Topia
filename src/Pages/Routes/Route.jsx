import { createBrowserRouter } from "react-router";
import Home from "../../Layouts/Home";
import HomePage from "../../HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
    //   {
    //     path: "/category/:id",
    //     element: <CategoryNews></CategoryNews>,
    //     loader: () => fetch("/news.json"),
    //   },
    ],
  },
]);

export default router;
