import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import DynamicHelmet from './DynamicHelmet';
import ToyDetailsCard from "./ToyDetailsCard";

const ToyDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [toy, setToy] = useState({});

  useEffect(() => {
    if (data) {
      const toyDetails = data.find((singleToy) => singleToy.toyId == id);
      setToy(toyDetails);
    }
  }, [data, id]);
  
  if (!toy || Object.keys(toy).length === 0) {
    return <div>Loading Toy Details...</div>;
  }

  return (
    <div>
      <DynamicHelmet 
        title={toy.toyName || "Toy Details"} 
      />
      
      <div className="w-11/12 mx-auto">
        <div className="my-[30px] text-[20px]">
          <Link to="/" className="font-bold">
            Home /
          </Link>{" "}
          <span className="text-secondary">{toy.toyName}</span>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <ToyDetailsCard toy={toy}></ToyDetailsCard>
      </div>
    </div>
  );
};

export default ToyDetails;