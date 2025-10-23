import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Banner from "../Components/Banner";

const Home = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <Navbar />
        <Header />
       
        {location.pathname === "/" && <Banner />}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
