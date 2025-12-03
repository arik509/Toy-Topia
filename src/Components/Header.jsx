import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/topia.png";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import userIcon from "../assets/8792047.png";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [stickyClass, setStickyClass] = useState("");
    const { user, logOut } = useContext(AuthContext);

    const activeClass = "text-[20px] text-orange-600 font-bold";
    const baseClass = "hover:text-[18px]";

    // Sticky navbar on scroll
    useEffect(() => {
        const stickNavbar = () => {
            if (window !== undefined) {
                let windowHeight = window.scrollY;
                windowHeight > 100 ? setStickyClass('fixed top-0 left-0 right-0 z-50 shadow-lg') : setStickyClass('');
            }
        };

        window.addEventListener("scroll", stickNavbar);
        return () => window.removeEventListener("scroll", stickNavbar);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("You are logged out!");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleViewContact = (e) => {
        e.preventDefault();
        
        if (!user) {
            navigate("/auth/login");
        } else {
            navigate("/contact");
        }
    };
    
    const isContactActive = location.pathname.startsWith('/contact');

    return (
        <>
            <header className={`bg-[#fffaf5] border-b border-gray-200 ${stickyClass} transition-all duration-300`}>
                <Toaster position="top-right" />
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
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                            Toy Topia
                        </h1>
                    </Link>

                    <nav className="hidden md:flex gap-6 font-bold text-accent">
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? activeClass : baseClass)}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/products"
                            className={({ isActive }) => (isActive ? activeClass : baseClass)}
                        >
                            All Items
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? activeClass : baseClass)}
                        >
                            About Us
                        </NavLink>
                        
                        <Link
                            to="/contact"
                            onClick={handleViewContact}
                            className={isContactActive ? activeClass : baseClass}
                        >
                            Contact
                        </Link>

                        {user && (
                            <>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) => (isActive ? activeClass : baseClass)}
                                >
                                    Cart
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => (isActive ? activeClass : baseClass)}
                                >
                                    Profile
                                </NavLink>
                            </>
                        )}
                    </nav>

                    <div className="flex gap-4 items-center">
                        {user && (
                            <div className="relative group">
                                <img
                                    src={user.photoURL || userIcon}
                                    alt="User"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    onClick={() => navigate("/profile")}
                                />
                                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                    {user?.displayName || "User"}
                                </span>
                            </div>
                        )}
                        {user ? (
                            <Link onClick={handleLogout} className="btn btn-secondary">
                                LogOut
                            </Link>
                        ) : (
                            <Link to="/auth/login" className="btn btn-secondary">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden absolute left-0 top-full bg-[#fffaf5] border-t border-gray-200 w-full py-4 shadow-md animate-fadeIn z-50">
                        <nav className="flex flex-col items-start gap-3 font-semibold text-accent px-6">
                            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/products" onClick={() => setMenuOpen(false)}>All Items</NavLink>
                            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>

                            <Link 
                                to="/contact" 
                                onClick={(e) => {setMenuOpen(false); handleViewContact(e);}}
                                className={isContactActive ? activeClass : baseClass}
                            >
                                Contact
                            </Link>

                            {user && (
                                <>
                                    <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
                                    <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>
            {stickyClass && <div className="h-[90px]"></div>}
        </>
    );
};

export default Header;
