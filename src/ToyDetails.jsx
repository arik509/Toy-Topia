import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import DynamicHelmet from './DynamicHelmet';
import ToyDetailsCard from "./ToyDetailsCard";

const ToyDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [toy, setToy] = useState({});

  useEffect(() => {
    if (data) {
      const toyDetails = data.find((singleToy) => singleToy.toyId == id);
      setToy(toyDetails);
    }
  }, [data, id]);
  
  if (!toy || Object.keys(toy).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ff7b54] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Toy Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <DynamicHelmet title={toy.toyName || "Toy Details"} />
      
      <div className="mb-6 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#ff7b54] transition-colors duration-300 font-semibold"
        >
          <FaArrowLeft /> Back
        </button>
        <span className="text-gray-400">|</span>
        <Link to="/" className="text-gray-600 hover:text-[#ff7b54] transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link to="/products" className="text-gray-600 hover:text-[#ff7b54] transition-colors">
          Products
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-secondary font-semibold">{toy.toyName}</span>
      </div>

      <ToyDetailsCard toy={toy} />
    </div>
  );
};

export default ToyDetails;
