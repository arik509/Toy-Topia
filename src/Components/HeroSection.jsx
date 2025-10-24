import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import bannerImg from "../assets/Play, learn, & grow!.png"; 
import { Link } from "react-router";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="relative w-full mb-16 overflow-hidden">
      
      <img
        src={bannerImg}
        alt="Hero Banner"
        className="w-full h-[80vh] object-cover object-center"
      />

      
      <div
        className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10 md:px-20"
        data-aos="fade-right"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Play, Learn & Grow!
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-md mb-6">
          Discover our fun and educational toys designed to inspire creativity
          and joy in every child.
        </p>
        <Link to="/products"
          data-aos="zoom-in"
          data-aos-delay="300"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
