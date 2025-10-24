import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import Header from "./Components/Header";
import ToyDetailsCard from "./ToyDetailsCard";


const ToyDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [toy, setToy] = useState({});
//   console.log(data, id, toy);

  useEffect(() => {
    const toyDetails = data.find((singleToy) => singleToy.toyId == id);
    setToy(toyDetails);
  }, [data, id]);
  
  return (
    <div>
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
