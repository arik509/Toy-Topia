import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
        <Navbar></Navbar>
        <Header></Header>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
