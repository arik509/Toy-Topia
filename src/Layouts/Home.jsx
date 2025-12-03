import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";

const Home = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <Header></Header>
        {location.pathname === "/" && <HeroSection />}
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Home;