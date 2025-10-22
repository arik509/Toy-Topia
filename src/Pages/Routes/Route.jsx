import { createBrowserRouter } from "react-router";
import Home from "../../Layouts/Home";

const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
  ]);

export default router;  