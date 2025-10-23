import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName || "User"}!`);
        setTimeout(() => navigate(location.state?.from || "/"), 1500);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((user) => {
        toast.success(`Logged in as ${user.displayName || "User"} via Google!`);
        setTimeout(() => navigate(location.state?.from || "/"), 1500);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="w-11/12 mx-auto">
        <div className="my-[30px] text-[20px]">
          <Link to="/" className="font-bold">
            Home /
          </Link>{" "}
          <span className="text-secondary">Login</span>
        </div>
      </div>

      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body p-[70px]">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-base-200 pb-6 ">
              Login Your Account
            </h1>

            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                {error && <p className="text-red-600 mt-2">{error}</p>}
                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Login
                </button>
              </fieldset>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-neutral w-full mt-2 flex justify-center items-center"
            >
             <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="mt-4 text-center">
              Don't Have An Account?{" "}
              <Link className="text-secondary" to="/auth/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
