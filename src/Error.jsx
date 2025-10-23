import React from "react";
import errorImg from "../src/assets/error.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";


const Error = () => {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <img className="w-[300px]" src={errorImg} alt="" />
        <h1 className="text-center font-bold text-2xl">Something Went Wrong</h1>
        <button onClick={()=> navigate(-1)} className="btn btn-secondary"><FaArrowLeft></FaArrowLeft>Go Back</button>
      </div>
    </div>
  );
};

export default Error;
