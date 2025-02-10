import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { UserToken, setUserToken } = useContext(UserContext);
  let { countt } = useContext(CartContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  function handleNavClick() {
    setIsOpen(false); 
  }

  return (
    <>
      <header className="bg-gray-100 fixed inset-x-0 top-0 z-50">
        <nav className="container flex items-center justify-between px-6 py-3 lg:px-24 lg:mx-auto lg:py-4">
          {/* Logo */}
          <Link to={"home"} className="lg:pe-4">
            <img src={logo} width={170} alt="freshcart" />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 bg-transparent hover:bg-gray-100 rounded-md p-2.5"
          >
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          {UserToken && (
            <div className="hidden lg:flex flex-1 justify-center space-x-8 capitalize">
              <NavLink to={"home"} className="font-medium text-gray-900">
                home
              </NavLink>
              <NavLink to={"cart"} className="font-medium text-gray-900">
                cart
              </NavLink>
              <NavLink to={"wishlist"} className="font-medium text-gray-900">
                wishlist
              </NavLink>
              <NavLink to={"products"} className="font-medium text-gray-900">
                products
              </NavLink>
              <NavLink to={"categories"} className="font-medium text-gray-900">
                categories
              </NavLink>
              <NavLink to={"brands"} className="font-medium text-gray-900">
                brands
              </NavLink>
            </div>
          )}

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {UserToken && (
              <NavLink to={"cart"} className="relative flex items-center">
                <ShoppingCart className="size-8 text-main" />
                {countt > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                    {countt}
                  </span>
                )}
              </NavLink>
            )}
            {UserToken ? (
              <span
                onClick={logOut}
                className="font-medium text-gray-900 cursor-pointer"
              >
                LogOut
              </span>
            ) : (
              <>
                <NavLink to={"register"} className="font-medium text-gray-900">
                  Register
                </NavLink>
                <NavLink to={"login"} className="font-medium text-gray-900">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/*  Mobile Dropdown Menu - Fixed Layout */}
        {isOpen && (
          <div className="lg:hidden transition-all duration-300 bg-gray-100 shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-2">
              {UserToken ? (
                <>
                  <NavLink
                    to={"home"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"cart"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to={"wishlist"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Wishlist
                  </NavLink>
                  <NavLink
                    to={"products"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to={"categories"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    to={"brands"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Brands
                  </NavLink>
                  <span
                    onClick={logOut}
                    className="block w-full text-center px-6 py-3 text-gray-900 cursor-pointer hover:bg-gray-50"
                  >
                    LogOut
                  </span>
                </>
              ) : (
                <>
                  <NavLink
                    to={"/"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to={"login"}
                    className="block w-full text-center px-6 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Log in
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
