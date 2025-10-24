import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
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
    if (!user) {
      navigate("/auth/login", { state: { from: `/products/${toyId}` } });
    } else {
      navigate(`/products/${toyId}`);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-[50px] lg:my-[80px]">
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-[40px] lg:mb-[60px]">
        Top picks for your little ones
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {toys.map((toy, index) => (
          <div
            key={toy.toyId}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-[#fffaf5] p-4 rounded-2xl shadow hover:shadow-lg transition-all duration-500 relative transform cursor-pointer hover:scale-[1.03]"
          >
            {toy.isTrending && (
              <span
                data-aos="slide-down"
                className="absolute top-3 left-3 bg-[#ff7b54] text-white text-sm px-3 py-1 rounded-full"
              >
                SALE
              </span>
            )}

            <button className="absolute top-3 right-3 text-gray-400 hover:text-[#ff7b54] transition-all duration-300">
              <FaRegHeart />
            </button>

            <div className="w-full flex justify-center mb-4">
              <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="w-40 h-40 object-contain transition-transform duration-500 hover:scale-110 "
              />
            </div>

            <h3 className="font-semibold text-lg text-gray-800 mb-1">{toy.toyName}</h3>

            <p className="text-sm text-gray-600 mb-1">
              Available:{" "}
              <span className="font-semibold text-[#ff7b54]">{toy.availableQuantity}</span>
            </p>

            <div className="flex items-center gap-2 mb-2">
              <p className="text-[#ff7b54] font-bold text-lg">${toy.price.toFixed(2)}</p>
            </div>

            <div className="flex gap-1 text-yellow-400 mb-3">
            <p className="text-[#ff7b54] font-bold text-lg flex items-center gap-2">{toy.rating} <FaStar></FaStar></p>
            </div>

            <div className="text-center">
              <button
                onClick={() => handleViewDetails(toy.toyId)}
                className="bg-[#ff7b54] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#ff946e] transition-all transform hover:scale-105 cursor-pointer"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
          .animate-floating {
            animation: floating 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PopularToys;
