import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import DynamicHelmet from "./DynamicHelmet";
import { FaSort } from "react-icons/fa";

const AllToys = () => {
  const toys = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const navigate = useNavigate();

  const categories = ["All", ...new Set(toys.map((toy) => toy.subCategory))];

  const filteredToys =
    selectedCategory === "All"
      ? toys
      : toys.filter((toy) => toy.subCategory === selectedCategory);

  const sortedToys = [...filteredToys].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      case "name-az":
        return a.toyName.localeCompare(b.toyName);
      case "name-za":
        return b.toyName.localeCompare(a.toyName);
      default:
        return 0;
    }
  });

  const handleViewDetails = (toyId) => {
    navigate(`/products/${toyId}`);
  };

  return (
    <div className="w-11/12 mx-auto">
      <DynamicHelmet title="Products" />
      <div className="my-[30px] lg:my-[60px] text-[20px]">
        <Link to="/">Home</Link> /{" "}
        <span className="text-secondary">Products</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border border-accent px-4 py-2 rounded"
            >
              {mobileMenuOpen ? "Close Categories" : "Show Categories"}
            </button>
          </div>

          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block sticky top-20 bg-white p-4 rounded shadow`}
          >
            <h2 className="font-bold text-[20px] mb-4">Product Categories</h2>
            <ul>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer mb-2 md:mb-4 px-3 py-2 rounded hover:bg-gray-100 transition ${
                    selectedCategory === cat
                      ? "bg-orange-100 text-secondary font-bold"
                      : ""
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="font-bold text-2xl">{selectedCategory} Toys</h2>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff7b54] w-full sm:w-auto"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedToys.map((toy) => (
              <div
                key={toy.toyId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                <div className="relative bg-linear-to-br from-orange-50 to-pink-50 p-4 h-52 flex items-center justify-center overflow-hidden">
                  <img
                    src={toy.pictureURL}
                    alt={toy.toyName}
                    className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col grow">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-[#ff7b54] transition-colors">
                    {toy.toyName}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 grow">
                    {toy.detailedDescription || `Discover the amazing ${toy.toyName} from ${toy.sellerName}. Perfect for kids aged ${toy.ageRange} with a rating of ${toy.rating} stars.`}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Price</span>
                      <span className="font-bold text-[#ff7b54]">${toy.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Rating</span>
                      <span className="font-semibold text-gray-700">{toy.rating} ⭐</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(toy.toyId)}
                    className="w-full bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white py-2.5 px-4 rounded-xl font-semibold hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto cursor-pointer"
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllToys;
