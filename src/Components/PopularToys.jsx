import React, { useEffect, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";

const PopularToys = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((toy) => toy.isTrending);
        setToys(featured);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top picks for your little ones
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {toys.map((toy) => (
          <div
            key={toy.toyId}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all duration-300 relative"
          >
            {toy.isTrending && (
              <span className="absolute top-3 left-3 bg-[#ff7b54] text-white text-sm px-3 py-1 rounded-full">
                TRENDING
              </span>
            )}

            <button className="absolute top-3 right-3 text-gray-400 hover:text-[#ff7b54]">
              <FaRegHeart />
            </button>

            <div className="w-full flex justify-center mb-4">
              <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="w-40 h-40 object-contain"
              />
            </div>

            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {toy.toyName}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              Available:{" "}
              <span className="font-semibold text-[#ff7b54]">
                {toy.availableQuantity}
              </span>
            </p>

            <div className="flex items-center gap-2 mb-2">
              <p className="text-[#ff7b54] font-bold text-lg">
                ${toy.price.toFixed(2)}
              </p>
            </div>


            <div className="flex gap-1 text-yellow-400 mb-3">
              {Array.from({ length: Math.round(toy.rating) }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className="text-center">
              <button className="bg-[#ff7b54] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#ff946e] transition-all">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularToys;
