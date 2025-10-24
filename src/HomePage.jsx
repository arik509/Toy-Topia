import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import PopularToys from "./Components/PopularToys";

const HomePage = () => {
  const [toys, setToys] = useState([]);
  const [mostRatedToys, setMostRatedToys] = useState([]);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        setToys(data.slice(0, 6));
  
        const sortedByRating = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setMostRatedToys(sortedByRating);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto my-[40px]">
      <h2 className="text-3xl font-bold text-center mb-6">Our Collections</h2>

      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {toys.map((toy) => (
          <SwiperSlide key={toy.toyId}>
            <div className="bg-[#fffaf5] p-6 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex justify-center items-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#333]">
                  {toy.toyName}
                </h3>
                <p className="text-sm text-gray-600 mb-">
                  ${toy.price.toFixed(2)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <PopularToys></PopularToys>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Loves</h2>
        <p className="text-center mb-6">Most rated products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRatedToys.map((toy) => (
            <div
              key={toy.toyId}
              className="bg-[#fffaf5] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex justify-center items-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#333]">
                  {toy.toyName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${toy.price.toFixed(2)}
                </p>
                <p className="text-sm text-yellow-500">
                  Rating: {toy.rating} ⭐
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
