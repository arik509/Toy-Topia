import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import DynamicHelmet from "./DynamicHelmet";

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    window.open(
      `https://mail.google.com/mail/u/0/#compose?to=${email}`,
      "_blank"
    );
  };

  return (
    <div>
      <DynamicHelmet title="Login-Forgot Password"></DynamicHelmet>
      <div className="my-[30px] lg:my-[60px] text-[20px]">
        <Link to="/">Home</Link> /{" "}
        <span className="text-secondary">Reset Password</span>
      </div>
      <div className="flex justify-center items-center ">
        <div className="card w-full max-w-md p-8 shadow-lg flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Reset Password
          </h1>
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-secondary w-full">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
