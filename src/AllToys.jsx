import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";

const AllToys = () => {
  const toys = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ["All", ...new Set(toys.map((toy) => toy.subCategory))];

  const filteredToys =
    selectedCategory === "All"
      ? toys
      : toys.filter((toy) => toy.subCategory === selectedCategory);

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-[30px] lg:my-[60px] text-[20px]">
        <Link to="/" className="font-bold">
          Home /
        </Link>{" "}
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
            } md:block sticky top-20 bg-white p-2 rounded shadow`}
          >
            <h2 className="font-bold text-[20px] mb-4">Product Categories</h2>
            <ul>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer mb-2 md:mb-4 px-2 py-1 rounded hover:bg-gray-100 ${
                    selectedCategory === cat ? "text-secondary font-bold " : ""
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToys.map((toy) => (
            <div
              key={toy.toyId}
              className="shadow-sm bg-[#fffaf5] rounded p-4 hover:shadow-lg transition flex flex-col"
            >
              <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="w-full h-48 object-contain mb-2"
              />
              <h3 className="font-semibold">{toy.toyName}</h3>
              <p className="text-sm text-gray-600">Seller: {toy.sellerName}</p>
              <p className="text-sm text-gray-600">Price: ${toy.price}</p>
              <p className="text-sm text-gray-600 mb-4">
                Rating: {toy.rating} ⭐
              </p>

              <button className="mt-auto bg-secondary text-white py-2 px-4 rounded hover:bg-[#e59970] transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllToys;
