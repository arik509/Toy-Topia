import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorCode,errorMessage);
        setError(errorCode);
      });
  };
  return (
    <div>
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
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
                <p className="mt-2">
                  Don't Have An Account ?{" "}
                  <Link className="text-secondary" to="/auth/register">
                    Register
                  </Link>{" "}
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
