import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const [page, setPage] = useState("home");
  const changePage = (newPage) => {
    setPage(newPage);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                onClick={() => changePage("home")}
                className={`py-4 px-2 ${
                  page === "home"
                    ? "text-green-500 border-b-4 border-green-500 "
                    : "text-gray-500  hover:text-green-500 transition duration-300"
                } py-4 px-2 font-semibold`}
              >
                Home
              </Link>
              <Link
                to="/page1"
                onClick={() => changePage("page1")}
                className={`py-4 px-2 ${
                  page === "page1"
                    ? "text-green-500 border-b-4 border-green-500 "
                    : "text-gray-500  hover:text-green-500 transition duration-300"
                } py-4 px-2 font-semibold`}
              >
                Page1
              </Link>
              <Link
                to="/page2"
                onClick={() => changePage("page2")}
                className={`py-4 px-2 ${
                  page === "page2"
                    ? "text-green-500 border-b-4 border-green-500 "
                    : "text-gray-500  hover:text-green-500 transition duration-300"
                } py-4 px-2 font-semibold`}
              >
                Page2
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <a
              onClick={logOut}
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300 cursor-pointer"
            >
              Log Out
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
