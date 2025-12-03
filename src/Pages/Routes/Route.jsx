import { createBrowserRouter } from "react-router";
import Home from "../../Layouts/Home";
import HomePage from "../../HomePage";
import AllToys from "../../AllToys";
import Login from "../../Login";
import Register from "../../Register";
import AuthLayout from "../../Layouts/AuthLayout";
import ToyDetails from "../../ToyDetails";
import Error from "../../Error";
import PrivateRoute from "../../Provider/PrivateRoute";
import Profile from "../../Profile";
import Contact from "../../Contact";
import ForgotPassword from "../../ForgotPassword";
import Cart from "../../Cart";
import UpdateProfile from "../../UpdateProfile";
import About from "../../About";

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
        loader: () => fetch("/toys.json"),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
      },
      {
        path: "/products/:id",
        element: <ToyDetails></ToyDetails>,
        loader: () => fetch("/toys.json"),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>
      }
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
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/update-profile",
    element: (
      <PrivateRoute>
        <UpdateProfile></UpdateProfile>
      </PrivateRoute>
    ),
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

export default router;
