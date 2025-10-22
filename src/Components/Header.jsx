import React, { useState } from "react";
import logo from "../assets/topia.png";
import { Link, NavLink } from "react-router";
import { IoCart, IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#fffaf5] border-b border-gray-200 relative">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        <button
          className="md:hidden text-3xl text-accent"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>

        <Link to="/" className="flex gap-2 items-center">
          <img
            className="w-[50px] md:w-[75px] lg:w-[90px]"
            src={logo}
            alt="Toy Topia logo"
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Toy Topia</h1>
        </Link>

        <nav className="hidden md:flex gap-6 font-bold text-accent">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            Shop
          </NavLink>
          <NavLink to="/career" className="hover:underline">
            Pages
          </NavLink>
          <NavLink to="/blog" className="hover:underline">
            Blog
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 text-accent font-bold">
          <IoCart size={24} />
          <span>Cart</span>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute left-0 top-full bg-[#fffaf5] border-t border-gray-200 w-1/2 py-4 shadow-md animate-fadeIn">
          <nav className="flex flex-col items-start gap-3 font-semibold text-accent px-6">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              Shop
            </NavLink>
            <NavLink to="/career" onClick={() => setMenuOpen(false)}>
              Pages
            </NavLink>
            <NavLink to="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
