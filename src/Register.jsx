import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, setUser, updatedUser, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updatedUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registered successfully!");
            setTimeout(() => navigate("/"), 1500);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((user) => {
        toast.success(
          `Welcome ${user.displayName || "User"}! Logged in with Google.`
        );
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((error) => {
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
          <span className="text-secondary">Register</span>
        </div>
      </div>

      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body p-[70px]">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-base-200 pb-6">
              Register your account
            </h1>

            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Your Name"
                required
              />

              <label className="label">Photo URL</label>
              <input
                name="photo"
                type="text"
                className="input"
                placeholder="Your Photo URL"
                required
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative overflow-visible">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12 focus:outline-none"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-neutral mt-4 w-full flex items-center gap-2"
              >
                <FcGoogle size={24} /> Register with Google
              </button>

              <p className="mt-2 text-sm">
                Already Have An Account?{" "}
                <Link className="text-secondary font-semibold" to="/auth/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
