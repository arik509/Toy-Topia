import React from "react";
import { Link } from "react-router";
import { TbTruckDelivery } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="bg-accent px-2 md:px-4 py-2">
      <div className="text-center w-11/12 mx-auto ">
        <div className="flex flex-row gap-2 items-center justify-center">
          
          <p className="text-[12px] md:text-[16px]">Free shipping with over $100</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
