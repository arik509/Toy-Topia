import React from "react";
import baby from "../assets/Play, learn, & grow!.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-full">
      <img
        src={baby}
        alt="Play, Learn & Grow"
        className="w-full h-auto object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 md:pb-20 bg-black/10">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg text-center">
          Play, Learn & Grow!
        </h2>
        <Link to="/products" className="bg-[#ff7b54] hover:bg-[#ff5722] text-white font-semibold py-3 px-6 rounded-full transition">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;
