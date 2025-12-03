import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularToys = () => {
  const [toys, setToys] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((toy) => toy.isTrending);
        setToys(featured);
      });
  }, []);


  const handleViewDetails = (toyId) => {
    navigate(`/products/${toyId}`);
  };

  return (
    <div className="my-[50px] lg:my-20">
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-10 lg:mb-[60px]">
        Top picks for your little ones
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {toys.map((toy, index) => (
          <div
            key={toy.toyId}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
          >
            
            <div className="relative bg-linear-to-br from-orange-50 to-pink-50 p-6 overflow-hidden">
              {toy.isTrending && (
                <span className="absolute top-4 left-4 bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                  SALE
                </span>
              )}
              
              <div className="relative h-56 flex items-center justify-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
            </div>

            
            <div className="p-5 bg-white">
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-[#ff7b54] transition-colors">
                {toy.toyName}
              </h3>

              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
                  <FaStar className="text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-gray-700">
                    {toy.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Stock: <span className="font-bold text-[#ff7b54]">{toy.availableQuantity}</span>
                </p>
              </div>

              
              <div className="mb-4">
                <p className="text-2xl font-bold text-[#ff7b54]">
                  ${toy.price.toFixed(2)}
                </p>
              </div>

              
              <button
                onClick={() => handleViewDetails(toy.toyId)}
                className="w-full bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white font-semibold py-3 rounded-xl 
                hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 transform hover:scale-105 
                shadow-md hover:shadow-xl cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularToys;
