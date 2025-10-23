import React from "react";
import { Link } from "react-router";
import { TbTruckDelivery } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="bg-accent px-2 md:px-4 py-2">
      <div className="flex justify-between w-11/12 mx-auto ">
        <div className="flex flex-row gap-2 items-center">
          <TbTruckDelivery size={18}></TbTruckDelivery>
          <p className="text-[12px] md:text-[16px]">Free shipping with over $100</p>
        </div>
        <div className="space-x-4 font-semibold pr-4 md:pr-6">
          <Link className="hover:underline">Login</Link>
          <Link className="hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
